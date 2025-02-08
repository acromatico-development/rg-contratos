import { Logo } from '@components'

const AuthLayout = ({
    children,
}: {
    children: React.ReactNode
}) => {
    return (
        <div className="min-h-full bg-gray-50">
            <div className="flex min-h-full flex-1 flex-col justify-center py-32 sm:px-6 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-md">
                    <div className="flex justify-center">
                        <Logo className="h-10 w-auto" color="dark" />
                    </div>
                </div>
                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-[480px]">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default AuthLayout;