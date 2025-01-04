import { useMinersLeaderboardQuery } from '../../redux/api/UserEndpoint';
import YourRanking from '../ui/Leaderboard/YourRanking';
import logo from "../../assets/ton.png";
import { Link } from 'react-router-dom';
import Top10 from '../ui/Leaderboard/Top10';
import Loading from '../ui/Loading';

const TopMinersLeaderboard = () => {
    const { data, isLoading } = useMinersLeaderboardQuery(undefined);
    if (isLoading) {
        return <Loading />
    }
    return (
        <div>
            <div className="p-2">
                <YourRanking myRank={data?.data?.user} />
                <Link to={'/mine'}>
                    <div className="bg-white p-3 mt-2 w-full gap-2 text-black h-fit flex justify-center items-center rounded-lg">
                        <img src={logo} alt="logo" className='size-4' />
                        <p className='font-poppins text-sm font-medium'>Boost mining rank</p>
                    </div>
                </Link>
            </div>
            <div className="relative -top-3">
                <Top10 Leaderboard={data?.data?.leaderboard} />
            </div>
        </div>
    );
};

export default TopMinersLeaderboard;