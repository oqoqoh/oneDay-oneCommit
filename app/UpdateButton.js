'use client';

import { useRouter } from 'next/router';

export default function UpdateButton(props) {
    const router = useRouter();

    return (
        <button
            onClick={() => {
                router.push(`/update/${props.id}`);
            }}
        >
            UPDATE
        </button>
    );
}
