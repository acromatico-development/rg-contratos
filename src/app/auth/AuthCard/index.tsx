import Link from 'next/link';

interface AuthCardProps {
  title: string;
  description: string;
  children: React.ReactNode;
  footerText: string;
  footerLinkText: string;
  footerLinkHref: string;
}

const AuthCard = ({
  title,
  description,
  children,
  footerText,
  footerLinkText,
  footerLinkHref,
}: AuthCardProps) => {
  return (
    <>
      <div className="bg-white px-6 py-12 shadow sm:rounded-lg sm:px-12">
        <div className="mb-10 text-center">
          <h1 className="text-xl font-semibold leading-9 text-gray-900">
            {title}
          </h1>
          <p className="mt-2 text-sm text-gray-600">
            {description}
          </p>
        </div>
        
        {children}
      </div>

      <p className="mt-10 text-center text-sm text-gray-500">
        {footerText}{' '}
        <Link href={footerLinkHref} className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
          {footerLinkText}
        </Link>
      </p>
    </>
  );
};

export default AuthCard; 