export async function signin(data: { email: string; password: string }) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/auth/signin`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }
    );

    if (!res.ok) {
      const error = await res.json();
      return {
        success: false,
        message: error.message || "Signin failed",
      };
    }

    const result = await res.json();
    return {
      success: true,
      data: result,
    };
  } catch (err: any) {
    return {
      success: false,
      message: err.message || "Something went wrong",
    };
  }
}
