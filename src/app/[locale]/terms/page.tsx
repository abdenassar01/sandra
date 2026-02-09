import type { Metadata } from 'next';
import Link from 'next/link';
import { StructuredData, createBreadcrumbStructuredData } from '@/lib/seo';
import { getI18n } from '@/lib/i18n/server';

export const metadata: Metadata = {
	title: 'Terms of Service',
	description:
		'Terms of Service of Sandras Cleaning. Understand the terms and conditions for using our professional cleaning services.',
	keywords: ['terms of service', 'terms and conditions', 'legal', 'Sandras Cleaning'],
};

export default async function TermsOfService({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	const t = await getI18n();

	const isFr = locale === 'fr';

	return (
		<>
			{/* Structured Data */}
			<StructuredData
				data={createBreadcrumbStructuredData([
					{ name: t('nav.home'), url: `https://sandrascleaning.com/${locale}` },
					{ name: isFr ? 'Conditions d\'utilisation' : 'Terms of Service', url: `https://sandrascleaning.com/${locale}/terms` },
				])}
			/>

			<div className="flex flex-col gap-4 container max-w-4xl py-8">
				{/* Header */}
				<div className="text-center py-8 md:py-12">
					<h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
						{isFr ? "Conditions d'" : 'Terms of '}
						<span className="text-primary">{isFr ? 'Utilisation' : 'Service'}</span>
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
									Bienvenue sur Sandras Cleaning. En utilisant nos services de nettoyage, vous acceptez les
									présentes conditions d'utilisation ("Conditions"). Veuillez les lire attentivement.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">1. Acceptation des conditions</h2>
								<p className="mb-4">
									En réservant ou en utilisant nos services de nettoyage, vous acceptez d'être lié par les
									présentes Conditions. Si vous n'acceptez pas ces Conditions, veuillez ne pas utiliser nos
									services.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">2. Description des services</h2>
								<p className="mb-4">
									Sandras Cleaning fournit des services de nettoyage professionnel, incluant mais sans s'y
									limiter :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Nettoyage résidentiel</li>
									<li>Nettoyage de bureaux et commerciaux</li>
									<li>Nettoyage en profondeur</li>
									<li>Nettoyage post-construction</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">3. Réservations et paiements</h2>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">3.1 Réservations</h3>
								<p className="mb-4">
									Les réservations peuvent être effectuées en ligne, par téléphone ou par courriel. Nous
									requerrons les informations suivantes :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Nom et coordonnées</li>
									<li>Adresse de la propriété</li>
									<li>Date et heure souhaitées</li>
									<li>Type de service requis</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">3.2 Tarifs</h3>
								<p className="mb-4">
									Les tarifs sont basés sur le type de service, la taille de la propriété et d'autres facteurs.
									Un devis gratuit sera fourni avant la prestation du service.
								</p>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">3.3 Paiement</h3>
								<p className="mb-4">
									Le paiement est dû à la fin de chaque service. Nous acceptons les modes de paiement suivants
									:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Espèces</li>
									<li>Cartes de crédit/débit</li>
									<li>Virements électroniques</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">4. Annulations et remboursements</h2>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">4.1 Annulation par le client</h3>
								<p className="mb-4">
									Veuillez nous aviser au moins 24 heures à l'avance pour annuler ou reprogrammer un
									rendez-vous sans frais. Les annulations de dernière heure peuvent entraîner des frais.
								</p>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">4.2 Annulation par Sandras Cleaning</h3>
								<p className="mb-4">
									Nous nous réservons le droit d'annuler ou de reprogrammer un rendez-vous en cas de
									circonstances imprévues (intempéries, urgences, etc.). Nous vous aviserons dans les plus
									brefs délais.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">5. Accès à la propriété</h2>
								<p className="mb-4">
									Le client doit s'assurer que notre équipe a accès à la propriété à l'heure convenue. Cela
									inclut :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Fournir les clés ou les codes d'accès nécessaires</li>
									<li>Être présent ou organiser l'accès à l'avance</li>
									<li>Assurer la sécurité de notre équipe sur place</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">6. Responsabilités du client</h2>
								<p className="mb-4">Le client s'engage à :</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Retirer les objets de valeur ou les objets fragiles</li>
									<li>Informer notre équipe des zones nécessitant une attention particulière</li>
									<li>S'assurer que les animaux de compagnie sont confinés ou retirés des lieux</li>
									<li>Ne pas perturber notre équipe pendant le nettoyage</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">7. Limitation de responsabilité</h2>
								<p className="mb-4">
									Bien que nous exercions le plus grand soin, Sandras Cleaning n'est pas responsable des :
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Dommages aux objets fragiles ou mal rangés</li>
									<li>Perte d'objets de valeur non sécurisés</li>
									<li>Dommages causés par des défauts préexistants</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">8. Garantie de satisfaction</h2>
								<p className="mb-4">
									Votre satisfaction est notre priorité. Si vous n'êtes pas satisfait de notre service, veuillez
									nous en informer dans les 24 heures suivant le service. Nous réparerons la situation.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">9. Propriété intellectuelle</h2>
								<p className="mb-4">
									Le contenu de notre site web (textes, images, logos) est la propriété de Sandras Cleaning et
									est protégé par les lois sur le droit d'auteur. Toute reproduction non autorisée est
									interdite.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">10. Modifications des conditions</h2>
								<p className="mb-4">
									Nous nous réservons le droit de modifier les présentes Conditions à tout moment. Les
									modifications entreront en vigueur dès leur publication sur notre site web.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">11. Loi applicable</h2>
								<p className="mb-4">
									Les présentes Conditions sont régies par les lois du Québec, Canada. Tout litige sera soumis
									aux tribunaux compétents du Québec.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">12. Contact</h2>
								<p className="mb-4">
									Pour toute question concernant les présentes Conditions, veuillez nous contacter :
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
									Welcome to Sandras Cleaning. By using our cleaning services, you agree to these Terms of
									Service ("Terms"). Please read them carefully.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">1. Acceptance of Terms</h2>
								<p className="mb-4">
									By booking or using our cleaning services, you agree to be bound by these Terms. If you do
									not agree to these Terms, please do not use our services.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">2. Service Description</h2>
								<p className="mb-4">
									Sandras Cleaning provides professional cleaning services, including but not limited to:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Residential cleaning</li>
									<li>Office and commercial cleaning</li>
									<li>Deep cleaning</li>
									<li>Post-construction cleaning</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">3. Bookings and Payments</h2>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">3.1 Bookings</h3>
								<p className="mb-4">Bookings can be made online, by phone, or email. We require:</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Name and contact information</li>
									<li>Property address</li>
									<li>Preferred date and time</li>
									<li>Type of service required</li>
								</ul>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">3.2 Pricing</h3>
								<p className="mb-4">
									Rates are based on service type, property size, and other factors. A free quote will be
									provided before service delivery.
								</p>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">3.3 Payment</h3>
								<p className="mb-4">Payment is due upon completion of each service. We accept:</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Cash</li>
									<li>Credit/debit cards</li>
									<li>Electronic transfers</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">4. Cancellations and Refunds</h2>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">4.1 Cancellation by Client</h3>
								<p className="mb-4">
									Please provide at least 24 hours notice to cancel or reschedule an appointment without
									charge. Last-minute cancellations may incur a fee.
								</p>

								<h3 className="text-xl font-semibold mb-3 mt-6 text-text">4.2 Cancellation by Sandras Cleaning</h3>
								<p className="mb-4">
									We reserve the right to cancel or reschedule an appointment due to unforeseen circumstances
									(weather, emergencies, etc.). We will notify you as soon as possible.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">5. Property Access</h2>
								<p className="mb-4">
									The client must ensure our team has access to the property at the scheduled time. This
									includes:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Providing necessary keys or access codes</li>
									<li>Being present or arranging access in advance</li>
									<li>Ensuring our team's safety on premises</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">6. Client Responsibilities</h2>
								<p className="mb-4">The client agrees to:</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Remove valuable or fragile items</li>
									<li>Inform our team of areas requiring special attention</li>
									<li>Ensure pets are secured or removed from premises</li>
									<li>Not disturb our team during cleaning</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">7. Limitation of Liability</h2>
								<p className="mb-4">
									While we exercise utmost care, Sandras Cleaning is not responsible for:
								</p>
								<ul className="list-disc list-inside space-y-2 mb-4 text-text/80">
									<li>Damage to fragile or improperly stored items</li>
									<li>Loss of unsecured valuables</li>
									<li>Damage from pre-existing defects</li>
								</ul>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">8. Satisfaction Guarantee</h2>
								<p className="mb-4">
									Your satisfaction is our priority. If you are not satisfied with our service, please notify
									us within 24 hours. We will make it right.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">9. Intellectual Property</h2>
								<p className="mb-4">
									All website content (text, images, logos) is the property of Sandras Cleaning and protected
									by copyright laws. Unauthorized reproduction is prohibited.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">10. Modification of Terms</h2>
								<p className="mb-4">
									We reserve the right to modify these Terms at any time. Changes will be effective
									immediately upon posting on our website.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">11. Governing Law</h2>
								<p className="mb-4">
									These Terms are governed by the laws of Quebec, Canada. Any disputes will be subject to
									the competent courts of Quebec.
								</p>

								<h2 className="text-2xl font-bold mb-4 mt-8 text-text">12. Contact</h2>
								<p className="mb-4">
									For any questions about these Terms, please contact us:
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
