const messages = [
  "احا ي دودتي",
  "احا ي دودتي تاني ",
  "انت شكلك مش دودتي🤔 ",
  "اشخرتلك طيب عشان تكتبيه صح ",
  "طب خدي الهنت ده المانجه مالها ؟"
];

const lockedMessage = "غيرته وريني بقا هتدخلي ازاي ";
let tries = 0;

document.getElementById("loginForm").addEventListener("submit", function(e){
  e.preventDefault();

  const password = document.getElementById("password").value.trim();
  const errorMsg = document.getElementById("passwordError");
  const correctPassword = "القماصههه"; 

  if(password === correctPassword){
      errorMsg.textContent = "";
      errorMsg.classList.remove("show");
      Swal.fire({
        icon: "success",
        title: "بحبك",
        showConfirmButton: false,
        timer: 1500
      }).then(()=> {
        window.location.href = "mm.html";
      });
      tries = 0;
  } else {
      tries++;

      if(tries % 5 === 0){
          errorMsg.textContent = lockedMessage;
      } else {
          errorMsg.textContent = messages[(tries-1) % messages.length];
      }

      errorMsg.classList.add("show"); // لازم عشان الرسالة تبان
      const formGroup = errorMsg.closest(".form-group");
      formGroup.classList.add("error"); // يهتز المربع
      setTimeout(() => formGroup.classList.remove("error"), 500);
  }
});
const passwordInput = document.getElementById("password");
const toggle = document.getElementById("passwordToggle");

toggle.addEventListener("click", () => {
  const eyeIcon = toggle.querySelector(".eye-icon");

  if (passwordInput.type === "password") {
    passwordInput.type = "text"; // هتبان الباسورد
    eyeIcon.classList.add("show-password"); // تغيير شكل العين
  } else {
    passwordInput.type = "password"; // يخفي الباسورد تاني
    eyeIcon.classList.remove("show-password");
  }
});


