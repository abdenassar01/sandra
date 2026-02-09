import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData, createBreadcrumbStructuredData } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';

export const metadata: Metadata = {
	title: 'Privacy Policy',
	description:
		'Privacy Policy of Sandras Cleaning. Learn how we collect, use, and protect your personal information when you use our cleaning services.',
	keywords: ['privacy policy', 'data protection', 'personal information', 'Sandras Cleaning'],
};

export default async function PrivacyPolicy({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getI18n();

	const isFr = locale === 'fr';

	return (
		<>
			{/* Structured Data */}
			<StructuredData
				data={createBreadcrumbStructuredData([
					{ name: t('nav.home'), url: `https://sandrascleaning.com/${locale}` },
					{ name: isFr ? 'Politique de confidentialité' : 'Privacy Policy', url: `https://sandrascleaning.com/${locale}/privacy` },
				])}
			/>

			<div className="flex flex-col gap-4 container max-w-4xl py-8">
				{/* Header */}
				<div className="text-center py-8 md:py-12">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						{isFr ? 'Politique de ' : 'Privacy '}
						<span className="text-primary">{isFr ? 'Confidentialité' : 'Policy'}</span>
					</h1>
					<p className="text-text/70 max-w-2xl mx-auto">
						{isFr
							? 'Dernière mise à jour : Janvier 2025'
							: 'Last updated: January 2025'}
					</p>
				</div>

				{/* Content */}
				<article className="bg-background-secondary rounded-2xl p-6 md:p-10 border border-secondary/20">
					<div className="prose prose-lg max-w-none prose-headings:text-text prose-p:text-text/80">
						{isFr ? (
							<>
								<p className="text-lg leading-relaxed mb-6">
									Chez Sandras Cleaning ("nous", "notre"), nous nous engageons à protéger votre vie privée. Cette
									Politique de confidentialité explique comment nous recueillons, utilisons et protégeons vos
									informations personnelles.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">1. Informations que nous recueillons</h2>
								<p className="mb-4">
									Ne recueillons vos informations personnelles que lorsque vous choisissez de nous les fournir.
									Vos informations sont uniquement recueillies par le biais de :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Formulaire de contact (pour nous envoyer un message)</li>
									<li>Formulaire d'évaluation (pour soumettre un avis)</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">1.1 Informations demandées</h3>
								<p className="mb-4">
									Lorsque vous utilisez notre formulaire de contact ou d'évaluation, nous pouvons vous demander :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Nom</li>
									<li>Coordonnées (téléphone, courriel)</li>
									<li>Message (pour le formulaire de contact)</li>
									<li>Avis (pour le formulaire d'évaluation)</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">1.2 Informations techniques</h3>
								<p className="mb-4">
									Nous pouvons également recueillir des informations techniques lorsque vous visitez notre site
									web :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Adresse IP</li>
									<li>Type de navigateur et appareil</li>
									<li>Pages visitées</li>
									<li>Temps passé sur le site</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">2. Utilisation des informations</h2>
								<p className="mb-4">Nous utilisons vos informations personnelles uniquement pour :</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Répondre à vos demandes via le formulaire de contact</li>
									<li>Afficher vos avis sur notre site web</li>
									<li>Améliorer nos services</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">3. Partage des informations</h2>
								<p className="mb-4">
									Ne vendons pas vos informations personnelles à des tiers. Vos informations ne sont partagées
									avec personne en dehors de notre entreprise, sauf lorsque la loi l'exige.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">4. Protection des données</h2>
								<p className="mb-4">
									Nous mettons en œuvre des mesures de sécurité appropriées pour protéger vos informations
									personnelles contre l'accès non autorisé, la modification ou la destruction.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">5. Vos droits</h2>
								<p className="mb-4">Vous avez le droit de :</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Accéder à vos informations personnelles</li>
									<li>Demander la correction de vos informations</li>
									<li>Demander la suppression de vos informations</li>
									<li>Vous opposer au traitement de vos informations</li>
								</ul>
								<p className="mb-4">
									Pour exercer ces droits, contactez-nous à l'adresse courriel indiquée ci-dessous.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">6. Cookies</h2>
								<p className="mb-4">
									Nous utilisons des cookies pour améliorer votre expérience sur notre site web. Les cookies
									sont des petits fichiers stockés sur votre appareil qui nous aident à comprendre comment vous
									utilisez notre site.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">7. Modifications</h2>
								<p className="mb-4">
									Nous nous réservons le droit de modifier cette politique de confidentialité à tout moment.
									Les modifications entreront en vigueur dès leur publication sur notre site web.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">8. Contact</h2>
								<p className="mb-4">
									Pour toute question concernant cette politique de confidentialité ou vos informations
									personnelles, veuillez nous contacter :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Courriel : Sandrascleaningservicesmtl@gmail.com</li>
									<li>Téléphone : +1 (438) 725-4115</li>
									<li>Adresse : Montreal, QC, Canada</li>
								</ul>
							</>
						) : (
							<>
								<p className="text-lg leading-relaxed mb-6">
									At Sandras Cleaning ("we", "our"), we are committed to protecting your privacy. This Privacy
									Policy explains how we collect, use, and safeguard your personal information.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">1. Information We Collect</h2>
								<p className="mb-4">
									We only collect your personal information when you choose to provide it to us. Your
									information is collected solely through:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Contact form (to send us a message)</li>
									<li>Review form (to submit a review)</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">1.1 Information Requested</h3>
								<p className="mb-4">
									When you use our contact or review form, we may ask for:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Name</li>
									<li>Contact details (phone, email)</li>
									<li>Message (for contact form)</li>
									<li>Review content (for review form)</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">1.2 Technical Information</h3>
								<p className="mb-4">
									We may also collect technical information when you visit our website:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>IP address</li>
									<li>Browser and device type</li>
									<li>Pages visited</li>
									<li>Time spent on site</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">2. How We Use Your Information</h2>
								<p className="mb-4">We use your personal information solely to:</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Respond to your inquiries via the contact form</li>
									<li>Display your reviews on our website</li>
									<li>Improve our services</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">3. Information Sharing</h2>
								<p className="mb-4">
									We do not sell your personal information to third parties. Your information is not shared
									with anyone outside our company, except when required by law.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">4. Data Security</h2>
								<p className="mb-4">
									We implement appropriate security measures to protect your personal information against
									unauthorized access, alteration, or destruction.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">5. Your Rights</h2>
								<p className="mb-4">You have the right to:</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Access your personal information</li>
									<li>Request correction of your information</li>
									<li>Request deletion of your information</li>
									<li>Object to processing of your information</li>
								</ul>
								<p className="mb-4">
									To exercise these rights, please contact us using the email below.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">6. Cookies</h2>
								<p className="mb-4">
									We use cookies to enhance your experience on our website. Cookies are small files stored on
									your device that help us understand how you use our site.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">7. Changes</h2>
								<p className="mb-4">
									We reserve the right to modify this privacy policy at any time. Changes will be effective
									immediately upon posting on our website.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">8. Contact</h2>
								<p className="mb-4">
									For any questions about this privacy policy or your personal information, please contact
									us:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Email: Sandrascleaningservicesmtl@gmail.com</li>
									<li>Phone: +1 (438) 725-4115</li>
									<li>Address: Montreal, QC, Canada</li>
								</ul>
							</>
						)}
					</div>
				</article>

				{/* Back Link */}
				<div className="text-center py-6">
					<Link
						href={`/${locale}`}
						className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors"
					>
						{isFr ? '← Retour à l\'accueil' : '← Back to Home'}
					</Link>
				</div>
			</div>
		</>
	);
}
