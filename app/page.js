import { connectDB } from '@/util/database';
import UserList from './UserList';
import UpdateButton from './UpdateButton';

export default async function Home() {
    let lastUpdKor = '';
    let userList = [];
    let updNonDateList = [];

    //현재 날짜
    const now = Date.now();
    const today = new Date(now).toLocaleDateString();

    //db connect
    const db = (await connectDB).db('commit-per-day');
    let result = await db.collection('users').find().toArray();

    //db data mapping
    result = result.map(async (data) => {
        data._id = data._id.toString();

        //github api 조회
        const res = await fetch(`https://api.github.com/users/${data.userId}`);
        const user = await res.json();

        if (checkCommitToday(user.updated_at)) {
            //오늘 커밋 있음
            let checkCommit = 1;
            let deleteIdx;
            //미커밋[]에 today 있는지 확인, 있으면 []에서 삭제
            for (let i of data.nonDateList) {
                if (i == today) {
                    checkCommit * 0;
                    deleteIdx = i;
                }
            }
            if (checkCommit == 0) data.nonDateList.splice(deleteIdx, 1);
            data.checkToday = 'Y';
        } else {
            //오늘 커밋 없음

            let checkNotCommit = 1;
            //today를 미커멋[] 추가 (추가전 같은 값 있으면 추가안함)
            for (let i of data.nonDateList) {
                if (i == today) checkNotCommit * 0;
            }
            if (checkNotCommit != 0) data.nonDateList.push(today);
            data.checkToday = 'N';
        }
        //data.checkToday
        //data.warnings = getDateDiff(lastUpdKor,today);
        data.profileImgUrl = user.avatar_url;
        data.today = today;

        console.log('user ::', user);
        console.log('data ::', data);
        console.log('nonDateList ::', data.nonDateList);
        userList.push(data);

        return data;
    });
    //console.log(result);

    //당일 커밋 여부 확인
    const checkCommitToday = (lastUpdateDate) => {
        //마지막 commit 날짜
        const lastUpd = new Date(lastUpdateDate);
        lastUpdKor = lastUpd.toLocaleDateString();
        console.log(lastUpdKor);
        console.log(today);
        if (lastUpdKor == today) return true;
        else return false;
    };

    return (
        <div>
            <UserList result={userList} />
            <UpdateButton />
        </div>
    );
}
