document.addEventListener("DOMContentLoaded", () => {


/*
    17Games | Bee ReMastered
    Main Website Script
*/


// Page loading animation

document.body.classList.add("loaded");




// Fade-in animation observer

const observer = new IntersectionObserver((entries) => {


    entries.forEach(entry => {


        if(entry.isIntersecting){


            entry.target.classList.add("show");


        }


    });


}, 
{
    threshold: 0.15
});




const animatedElements = document.querySelectorAll(
    ".card, .zone-card, .staff-card, .developer-card, .stat, section"
);



animatedElements.forEach(element => {


    element.classList.add("hidden");


    observer.observe(element);


});







// Navbar scroll effect


const navbar = document.querySelector(".navbar");


if(navbar){


window.addEventListener("scroll", () => {


    if(window.scrollY > 50){

        navbar.classList.add("scrolled");

    }

    else{

        navbar.classList.remove("scrolled");

    }


});


}









// Smooth scrolling


document.querySelectorAll('a[href^="#"]').forEach(link => {


link.addEventListener("click", function(e){


e.preventDefault();


const target = document.querySelector(
this.getAttribute("href")
);



if(target){

target.scrollIntoView({

behavior:"smooth"

});

}


});


});









// Automatically update footer year


const footerYear = document.querySelector(
"footer .year"
);



if(footerYear){

footerYear.textContent =
new Date().getFullYear();

}








// Profile image fallback


const images = document.querySelectorAll(
".profile-image"
);



images.forEach(img => {



img.addEventListener("error", () => {


img.src =
"assets/images/default-avatar.png";



});



});








// Add page transition


window.addEventListener(
"beforeunload",
()=>{

document.body.classList.add(
"page-leaving"
);

}

);



});
