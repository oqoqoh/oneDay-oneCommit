'use client';
import { useRouter } from 'next/navigation';

export default function UpdateButton(props) {
    const router = useRouter();

    console.log('props ::', props);
    return (
        <button
            onClick={() => {
                router.push(`api/post/edit`);
            }}
        >
            UPDATE
        </button>
    );
}
