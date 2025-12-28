'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useForm } from '@tanstack/react-form';

interface FAQ {
	id: number;
	question: string;
	answer: string;
	locale: string;
	sort_order: number;
}

interface FAQsResponse {
	faqs: FAQ[];
}

interface CreateUpdateResponse {
	success: boolean;
	faq?: FAQ;
	error?: string;
}

interface FAQFormData {
	question: string;
	answer: string;
	locale: string;
	sort_order: number;
}

async function fetchFAQs(): Promise<FAQ[]> {
	const response = await fetch('/api/admin/faqs');
	if (!response.ok) {
		if (response.status === 401) {
			throw new Error('UNAUTHORIZED');
		}
		throw new Error('Failed to fetch FAQs');
	}
	const data: FAQsResponse = await response.json();
	return data.faqs;
}

async function createFAQ(data: FAQFormData): Promise<CreateUpdateResponse> {
	const response = await fetch('/api/admin/faqs', {
		method: 'POST',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result: CreateUpdateResponse = await response.json();
	if (!response.ok) {
		return { success: false, error: result.error || 'Failed to create FAQ' };
	}
	return { success: true, faq: result.faq };
}

async function updateFAQ(id: number, data: FAQFormData): Promise<CreateUpdateResponse> {
	const response = await fetch(`/api/admin/faqs/${id}`, {
		method: 'PUT',
		headers: { 'Content-Type': 'application/json' },
		body: JSON.stringify(data),
	});

	const result: CreateUpdateResponse = await response.json();
	if (!response.ok) {
		return { success: false, error: result.error || 'Failed to update FAQ' };
	}
	return { success: true, faq: result.faq };
}

async function deleteFAQ(id: number): Promise<void> {
	const response = await fetch(`/api/admin/faqs/${id}`, {
		method: 'DELETE',
	});
	if (!response.ok) {
		throw new Error('Failed to delete FAQ');
	}
}

export default function AdminFAQsPage() {
	const router = useRouter();
	const queryClient = useQueryClient();
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);

	const { data: faqs = [], isLoading } = useQuery<FAQ[]>({
		queryKey: ['admin-faqs'],
		queryFn: fetchFAQs,
		retry: false,
		throwOnError: (error) => {
			if (error instanceof Error && error.message === 'UNAUTHORIZED') {
				router.push('/admin/login');
				return false;
			}
			return true;
		},
	});

	const closeForm = () => {
		setEditingId(null);
		setEditingFAQ(null);
		setShowForm(false);
	};

	const createMutation = useMutation({
		mutationFn: createFAQ,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-faqs'] });
			closeForm();
		},
	});

	const updateMutation = useMutation({
		mutationFn: ({ id, data }: { id: number; data: FAQFormData }) => updateFAQ(id, data),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-faqs'] });
			closeForm();
		},
	});

	const deleteMutation = useMutation({
		mutationFn: deleteFAQ,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['admin-faqs'] });
		},
	});

	const form = useForm({
		defaultValues: {
			question: '',
			answer: '',
			locale: 'en',
			sort_order: 0,
		},
		onSubmit: async ({ value }) => {
			if (editingId) {
				const result = await updateMutation.mutateAsync({ id: editingId, data: value });
				if (!result.success) {
					throw new Error(result.error || 'Failed to update FAQ');
				}
			} else {
				const result = await createMutation.mutateAsync(value);
				if (!result.success) {
					throw new Error(result.error || 'Failed to create FAQ');
				}
			}
		},
	});

	// Update form when editingFAQ changes
	useEffect(() => {
		if (editingFAQ) {
			form.setFieldValue('question', editingFAQ.question);
			form.setFieldValue('answer', editingFAQ.answer);
			form.setFieldValue('locale', editingFAQ.locale);
			form.setFieldValue('sort_order', editingFAQ.sort_order);
		}
	}, [editingFAQ, form]);

	const openCreateForm = () => {
		setEditingId(null);
		setEditingFAQ(null);
		setShowForm(true);
	};

	const openEditForm = (faq: FAQ) => {
		setEditingId(faq.id);
		setEditingFAQ(faq);
		setShowForm(true);
	};

	const handleDelete = (id: number) => {
		if (!confirm('Are you sure you want to delete this FAQ?')) {
			return;
		}
		deleteMutation.mutate(id);
	};

	const isPending = createMutation.isPending || updateMutation.isPending;

	if (isLoading) {
		return (
			<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
				<div className="px-4 py-6 sm:px-0">
					<div className="text-center">Loading...</div>
				</div>
			</div>
		);
	}

	return (
		<div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
			<div className="px-4 py-6 sm:px-0">
				<div className="mb-6 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
					<div>
						<h1 className="text-3xl font-bold" style={{ color: 'var(--text)' }}>
							Manage FAQs
						</h1>
						<p className="mt-2 text-sm" style={{ color: 'var(--text)', opacity: 0.7 }}>
							Create and manage your frequently asked questions
						</p>
					</div>
					<button
						onClick={openCreateForm}
						className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
						style={{ backgroundColor: 'var(--primary)' }}
					>
						Add New FAQ
					</button>
				</div>

				{showForm && (
					<div
						className="mb-6 rounded-2xl p-6 border border-primary/10"
						style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
					>
						<h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
							{editingId ? 'Edit FAQ' : 'Add New FAQ'}
						</h2>

						{createMutation.error && (
							<div className="mb-4 rounded-xl p-4 text-sm" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
								{createMutation.error instanceof Error ? createMutation.error.message : 'An error occurred'}
							</div>
						)}

						{updateMutation.error && (
							<div className="mb-4 rounded-xl p-4 text-sm" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
								{updateMutation.error instanceof Error ? updateMutation.error.message : 'An error occurred'}
							</div>
						)}

						{(form.state.errors as any)?.question && (
							<div className="mb-4 rounded-xl p-4 text-sm" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
								{(form.state.errors as any).question}
							</div>
						)}

						{(form.state.errors as any)?.answer && (
							<div className="mb-4 rounded-xl p-4 text-sm" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
								{(form.state.errors as any).answer}
							</div>
						)}

						<form
							onSubmit={(e) => {
								e.preventDefault();
								form.handleSubmit();
							}}
						>
							<div className="grid grid-cols-1 gap-5">
								{/* Question */}
								<div>
									<label htmlFor="question" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
										Question
									</label>
									<form.Field
										name="question"
										children={(field) => (
											<input
												id="question"
												name={field.name}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Enter the question"
												className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
												style={{ borderColor: 'var(--secondary/20)' }}
												disabled={isPending}
											/>
										)}
									/>
								</div>

								{/* Answer */}
								<div>
									<label htmlFor="answer" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
										Answer
									</label>
									<form.Field
										name="answer"
										children={(field) => (
											<textarea
												id="answer"
												name={field.name}
												rows={4}
												value={field.state.value}
												onBlur={field.handleBlur}
												onChange={(e) => field.handleChange(e.target.value)}
												placeholder="Enter the answer"
												className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all resize-none"
												style={{ borderColor: 'var(--secondary/20)' }}
												disabled={isPending}
											/>
										)}
									/>
								</div>

								{/* Locale and Sort Order */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label htmlFor="locale" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
											Locale
										</label>
										<form.Field
											name="locale"
											children={(field) => (
												<select
													id="locale"
													name={field.name}
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(e.target.value)}
													className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all appearance-none"
													style={{ borderColor: 'var(--secondary/20)' }}
													disabled={isPending}
												>
													<option value="en">English</option>
													<option value="it">Italian</option>
													<option value="es">Spanish</option>
													<option value="fr">French</option>
												</select>
											)}
										/>
									</div>

									<div>
										<label htmlFor="sort_order" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
											Sort Order
										</label>
										<form.Field
											name="sort_order"
											children={(field) => (
												<input
													id="sort_order"
													name={field.name}
													type="number"
													value={field.state.value}
													onBlur={field.handleBlur}
													onChange={(e) => field.handleChange(parseInt(e.target.value) || 0)}
													className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
													style={{ borderColor: 'var(--secondary/20)' }}
													disabled={isPending}
												/>
											)}
										/>
									</div>
								</div>
							</div>

							<div className="mt-6 flex justify-end gap-3">
								<button
									type="button"
									onClick={closeForm}
									className="px-6 py-3 rounded-xl text-sm font-semibold border transition-all bg-teal-400/10 text-teal-400"
									disabled={isPending}
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={isPending}
									className="px-6 py-3 rounded-xl border text-sm font-semibold text-primary bg-primary/10 transition-all disabled:opacity-50"
								>
									{isPending ? 'Saving...' : editingId ? 'Update FAQ' : 'Create FAQ'}
								</button>
							</div>
						</form>
					</div>
				)}

				<div className="rounded-2xl border overflow-hidden border-primary/10 bg-background-secondary">
					{faqs.length === 0 ? (
						<div className="px-4 py-12 text-center" style={{ color: 'var(--text)', opacity: 0.6 }}>
							No FAQs found. Create your first FAQ!
						</div>
					) : (
						<div className="divide-y divide-primary/10">
							{faqs.map((faq) => (
								<div key={faq.id} className="p-4 sm:px-6">
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 flex-wrap">
												<p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
													{faq.question}
												</p>
												<span
													className="px-2 py-0.5 rounded-full text-xs font-semibold"
													style={{ backgroundColor: 'var(--secondary)', color: 'white' }}
												>
													{faq.locale}
												</span>
												<span
													className="px-2 py-0.5 rounded-full text-xs font-semibold"
													style={{ backgroundColor: 'var(--secondary/20)', color: 'var(--text)' }}
												>
													Order: {faq.sort_order}
												</span>
											</div>
											<p className="mt-2 text-sm" style={{ color: 'var(--text)' }}>
												{faq.answer}
											</p>
										</div>
										<div className="flex gap-2 sm:self-center">
											<button
												onClick={() => openEditForm(faq)}
												disabled={deleteMutation.isPending}
												className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 disabled:opacity-50"
												style={{ backgroundColor: 'var(--primary)', color: 'white' }}
											>
												Edit
											</button>
											<button
												onClick={() => handleDelete(faq.id)}
												disabled={deleteMutation.isPending}
												className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105 disabled:opacity-50"
												style={{ backgroundColor: 'var(--error)', color: 'white' }}
											>
												Delete
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
