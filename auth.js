document.getElementById("loginForm").addEventListener("submit", async (e) => {
  e.preventDefault();
  
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const errorMessage = document.getElementById("error-message");
  const submitButton = e.target.querySelector("button");
  
  // Блокируем кнопку на время запроса
  submitButton.disabled = true;
  submitButton.textContent = "Вход...";
  errorMessage.textContent = "";

  try {
    const response = await fetch("http://192.168.0.167:8080/api/auth/sign-in", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(
        errorData?.message || "Неверный логин или пароль"
      );
    }

    const data = await response.json();
    
    if (!data.accessToken) {
      throw new Error("Сервер не вернул токен");
    }

   
    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("refreshToken", data.refreshToken || "");
    sessionStorage.setItem("userId", data.userId || "");

    // Переход в админку
    window.location.href = "admin.html";
  } catch (error) {
    errorMessage.textContent = error.message;
  } finally {
    submitButton.disabled = false;
    submitButton.textContent = "Войти";
  }
});