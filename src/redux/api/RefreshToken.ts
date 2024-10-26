const refreshToken = async () => {
    const res = await fetch(
        `https://assignment-3-blond.vercel.app/api/auth/refresh-token`,
        {
            method: "POST",
            credentials: "include",
        }
    );

    const data = await res.json();
    return data?.token;
};

export default refreshToken;
