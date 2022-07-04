document.getElementById("newtask").addEventListener("submit", (el) => {
    // console.log("enterd");
    if (document.querySelector("#title").value.length == 0) {
        alert("Enter a task to do...");
    }
});