const refreshToken = async () => {
    const res = await fetch(`http://localhost:5000/api/auth/refresh-token`, {
        method: "POST",
        credentials: "include",
    });

    const data = await res.json();
    return data?.token;
};

export default refreshToken;
