export const metadata = {
  title: "Privacy Policy",
};

export default function PrivacyPage() {
  return (
    <div className="h-full overflow-y-scroll pb-12">
      <div className="mx-auto max-w-3xl px-6 py-12 space-y-6 text-stone-200">
      <h1 className="text-3xl font-bold">Privacy Policy</h1>

      <p>
        This Privacy Policy explains how we collect, use, and protect your
        information when you use this website.
      </p>

      <h2 className="text-xl font-semibold">Information We Collect</h2>
      <p>
        We may collect account identifiers, authentication data, and user-
        provided content such as profile images or vanity URLs.
      </p>

      <h2 className="text-xl font-semibold">How We Use Information</h2>
      <p>
        Information is used to operate the service, authenticate users, and
        provide requested features.
      </p>

      <h2 className="text-xl font-semibold">Third-Party Services</h2>
      <p>
        We use third-party services such as Firebase and Cloudflare to store
        data and deliver content.
      </p>

      <h2 className="text-xl font-semibold">Public Information</h2>
      <p>
        Certain information, such as vanity URLs and public profile assets, may
        be publicly accessible.
      </p>

      <h2 className="text-xl font-semibold">Data Security</h2>
      <p>
        We take reasonable measures to protect your data but cannot guarantee
        absolute security.
      </p>

      <h2 className="text-xl font-semibold">Changes</h2>
      <p>
        This policy may be updated from time to time. Continued use of the
        service constitutes acceptance of changes.
      </p>
      </div>
    </div>
  );
}
