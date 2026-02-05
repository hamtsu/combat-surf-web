export const metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <div className="h-full overflow-y-scroll pb-12">
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-6 text-stone-200">
        <h1 className="text-3xl font-bold">Terms of Service</h1>
        <p>
          By accessing or using this website, you agree to be bound by these
          Terms of Service. If you do not agree, you may not use the service.
        </p>

        <h2 className="text-xl font-semibold">Eligibility</h2>
        <p>You must be at least 13 years old to use this website.</p>

        <h2 className="text-xl font-semibold">Accounts</h2>
        <p>
          You are responsible for maintaining the security of your account and
          any activity that occurs under it.
        </p>

        <h2 className="text-xl font-semibold">Vanity URLs</h2>
        <p>
          Users may claim a vanity URL subject to availability. Vanity URLs are
          granted on a first-come, first-served basis and may be revoked if they
          violate these terms or applicable laws.
        </p>

        <h2 className="text-xl font-semibold">Acceptable Use</h2>
        <p>
          You agree not to misuse the service, including attempting to gain
          unauthorized access, disrupt service operation, or violate applicable
          laws.
        </p>

        <h2 className="text-xl font-semibold">Termination</h2>
        <p>
          We reserve the right to suspend or terminate access to the service at
          any time for violations of these terms.
        </p>

        <h2 className="text-xl font-semibold">Disclaimer</h2>
        <p>The service is provided “as is” without warranties of any kind.</p>

        <h2 className="text-xl font-semibold">Governing Law</h2>
        <p>These terms are governed by the laws of Australia.</p>
      </div>
    </div>
  );
}
