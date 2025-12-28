'use client';

import { useEffect, useState } from 'react';

interface FAQ {
	id: number;
	question: string;
	answer: string;
	locale: string;
	sort_order: number;
}

export default function AdminFAQsPage() {
	const [faqs, setFaqs] = useState<FAQ[]>([]);
	const [loading, setLoading] = useState(true);
	const [showForm, setShowForm] = useState(false);
	const [editingId, setEditingId] = useState<number | null>(null);
	const [error, setError] = useState('');
	const [success, setSuccess] = useState('');
	const [saving, setSaving] = useState(false);
	const [formData, setFormData] = useState({
		question: '',
		answer: '',
		locale: 'en',
		sort_order: 0,
	});

	useEffect(() => {
		fetchFAQs();
	}, []);

	const fetchFAQs = async () => {
		try {
			const response = await fetch('/api/admin/faqs');
			if (response.ok) {
				const data = await response.json();
				setFaqs(data.faqs);
			} else {
				if (response.status === 401) {
					window.location.href = '/admin/login';
				}
			}
		} catch (err) {
			setError('Failed to load FAQs');
		} finally {
			setLoading(false);
		}
	};

	const resetForm = () => {
		setFormData({ question: '', answer: '', locale: 'en', sort_order: 0 });
		setEditingId(null);
		setShowForm(false);
		setError('');
		setSuccess('');
	};

	const handleEdit = (faq: FAQ) => {
		setFormData({
			question: faq.question,
			answer: faq.answer,
			locale: faq.locale,
			sort_order: faq.sort_order,
		});
		setEditingId(faq.id);
		setShowForm(true);
		setError('');
		setSuccess('');
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setError('');
		setSuccess('');
		setSaving(true);

		try {
			const url = editingId
				? `/api/admin/faqs/${editingId}`
				: '/api/admin/faqs';
			const method = editingId ? 'PUT' : 'POST';

			const response = await fetch(url, {
				method,
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(formData),
			});

			if (response.ok) {
				setSuccess(editingId ? 'FAQ updated successfully!' : 'FAQ created successfully!');
				resetForm();
				fetchFAQs();
			} else {
				const data = await response.json();
				setError(data.error || 'Failed to save FAQ');
			}
		} catch (err) {
			setError('An error occurred. Please try again.');
		} finally {
			setSaving(false);
		}
	};

	const handleDelete = async (id: number) => {
		if (!confirm('Are you sure you want to delete this FAQ?')) {
			return;
		}
		try {
			const response = await fetch(`/api/admin/faqs/${id}`, {
				method: 'DELETE',
			});
			if (response.ok) {
				setFaqs(faqs.filter((f) => f.id !== id));
			}
		} catch (err) {
			setError('Failed to delete FAQ');
		}
	};

	if (loading) {
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
						onClick={() => {
							resetForm();
							setShowForm(true);
						}}
						className="inline-flex items-center px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105"
						style={{ backgroundColor: 'var(--primary)' }}
					>
						Add New FAQ
					</button>
				</div>

				{showForm && (
					<div
						className="mb-6 rounded-2xl p-6 border"
						style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
					>
						<h2 className="text-lg font-semibold mb-4" style={{ color: 'var(--text)' }}>
							{editingId ? 'Edit FAQ' : 'Add New FAQ'}
						</h2>

						{error && (
							<div className="mb-4 rounded-xl p-4 text-sm" style={{ backgroundColor: '#fee2e2', color: '#991b1b' }}>
								{error}
							</div>
						)}

						{success && (
							<div className="mb-4 rounded-xl p-4 text-sm" style={{ backgroundColor: '#dcfce7', color: '#166534' }}>
								{success}
							</div>
						)}

						<form onSubmit={handleSubmit}>
							<div className="grid grid-cols-1 gap-5">
								{/* Question */}
								<div>
									<label htmlFor="question" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
										Question
									</label>
									<input
										type="text"
										id="question"
										required
										value={formData.question}
										onChange={(e) => setFormData({ ...formData, question: e.target.value })}
										placeholder="Enter the question"
										className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
										style={{ borderColor: 'var(--secondary/20)' }}
										disabled={saving}
									/>
								</div>

								{/* Answer */}
								<div>
									<label htmlFor="answer" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
										Answer
									</label>
									<textarea
										id="answer"
										required
										rows={4}
										value={formData.answer}
										onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
										placeholder="Enter the answer"
										className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all resize-none"
										style={{ borderColor: 'var(--secondary/20)' }}
										disabled={saving}
									/>
								</div>

								{/* Locale and Sort Order */}
								<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
									<div>
										<label htmlFor="locale" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
											Locale
										</label>
										<select
											id="locale"
											value={formData.locale}
											onChange={(e) => setFormData({ ...formData, locale: e.target.value })}
											className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all appearance-none"
											style={{ borderColor: 'var(--secondary/20)' }}
											disabled={saving}
										>
											<option value="en">English</option>
											<option value="it">Italian</option>
											<option value="es">Spanish</option>
											<option value="fr">French</option>
										</select>
									</div>

									<div>
										<label htmlFor="sort_order" className="block text-sm font-medium mb-2" style={{ color: 'var(--text)' }}>
											Sort Order
										</label>
										<input
											type="number"
											id="sort_order"
											value={formData.sort_order}
											onChange={(e) =>
												setFormData({
													...formData,
													sort_order: parseInt(e.target.value) || 0,
												})
											}
											className="w-full px-4 py-3 rounded-xl border bg-white focus:outline-none focus:ring-2 text-sm transition-all"
											style={{ borderColor: 'var(--secondary/20)' }}
											disabled={saving}
										/>
									</div>
								</div>
							</div>

							<div className="mt-6 flex justify-end gap-3">
								<button
									type="button"
									onClick={resetForm}
									className="px-6 py-3 rounded-xl text-sm font-semibold border transition-all hover:scale-105"
									style={{ borderColor: 'var(--secondary/20)', color: 'var(--text)' }}
									disabled={saving}
								>
									Cancel
								</button>
								<button
									type="submit"
									disabled={saving}
									className="px-6 py-3 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 disabled:opacity-50"
									style={{ backgroundColor: 'var(--primary)' }}
								>
									{saving ? 'Saving...' : editingId ? 'Update FAQ' : 'Create FAQ'}
								</button>
							</div>
						</form>
					</div>
				)}

				{/* FAQs List */}
				<div
					className="rounded-2xl border overflow-hidden"
					style={{ backgroundColor: 'var(--background-secondary)', borderColor: 'var(--secondary/20)' }}
				>
					{faqs.length === 0 ? (
						<div className="px-4 py-12 text-center" style={{ color: 'var(--text)', opacity: 0.6 }}>
							No FAQs found. Create your first FAQ!
						</div>
					) : (
						<div className="divide-y" style={{ borderColor: 'var(--secondary/20)' }}>
							{faqs.map((faq) => (
								<div key={faq.id} className="p-4 sm:px-6">
									<div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
										<div className="flex-1 min-w-0">
											<div className="flex items-center gap-2 flex-wrap">
												<p className="text-sm font-semibold" style={{ color: 'var(--primary)' }}>
													{faq.question}
												</p>
												<span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--secondary)', color: 'white' }}>
													{faq.locale}
												</span>
												<span className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: 'var(--secondary/20)', color: 'var(--text)' }}>
													Order: {faq.sort_order}
												</span>
											</div>
											<p className="mt-2 text-sm" style={{ color: 'var(--text)' }}>
												{faq.answer}
											</p>
										</div>
										<div className="flex gap-2 sm:self-center">
											<button
												onClick={() => handleEdit(faq)}
												className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
												style={{ backgroundColor: 'var(--primary)', color: 'white' }}
											>
												Edit
											</button>
											<button
												onClick={() => handleDelete(faq.id)}
												className="inline-flex items-center px-4 py-2 rounded-xl text-xs font-semibold transition-all hover:scale-105"
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
