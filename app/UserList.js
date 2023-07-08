'use client';

//import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';

export default function UserList({ result }) {
    const router = useRouter();
    return (
        <>
            {result.map((data, i) => {
                return (
                    <div key={i}>
                        <p>{data.userName}</p>
                        <p>
                            {' '}
                            오늘의 챌린지 :
                            {data.checkToday === 'Y' ? (
                                <span> 오커완</span>
                            ) : (
                                <span> 커밋해주세요</span>
                            )}
                        </p>
                        <img src={`https://ghchart.rshah.org/${data.userId}`} />

                        <p>
                            챌린지 실패 횟수 :
                            {data.nonDateList.length == 0 ? (
                                <span> {data.nonDateList.length}</span>
                            ) : (
                                <span> {data.nonDateList.length - 1}</span>
                            )}
                        </p>
                    </div>
                );
            })}
            <button
                onClick={() => {
                    // router.push(`api/post/edit`);
                    router.push({
                        pathname: `api/post/edit`,
                        query: result,
                    });
                }}
            >
                UPDATE
            </button>
        </>
    );
}
