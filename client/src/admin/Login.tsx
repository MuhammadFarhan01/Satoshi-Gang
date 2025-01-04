import { useForm } from 'react-hook-form';

const Login = () => {
    const { register, handleSubmit } = useForm();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const HandleLogin = (e: any) => {
        sessionStorage.setItem("secret", e.secret);
        window.location.href = "/auth/0/admin";
    }
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <form onSubmit={handleSubmit(HandleLogin)} className='bg-white bg-opacity-10 p-4 w-sm rounded-lg'>
                <p className='text-white text-xl text-center font-tektur'>Login</p>
                <label className="form-control w-full max-w-xs">
                    <div className="label">
                        <span className="label-text font-tektur">Secret</span>
                    </div>
                    <input type="number" placeholder="secret" {...register("secret")} required className="input font-tektur input-bordered w-full max-w-xs" />
                </label>

                <button type="submit" className='bg-white text-black p-2 rounded-md mt-3 font-tektur w-full'>Login</button>
            </form>
        </div>
    );
};

export default Login;