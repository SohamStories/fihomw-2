import { CircleAlert } from 'lucide-react';

interface FormErrorProps {
    message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
    if (!message) return null;  // If no message, return nothing (do not render the error box)

    return (
        <div className="flex space-x-4 items-center p-2 rounded-lg text-red-500 bg-red-500/30">
            <CircleAlert className="w-4 h-4" />
            <p>{message}</p>
        </div>
    );
};
