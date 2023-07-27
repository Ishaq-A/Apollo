/* 
    The code contained withinin this (sidebar.js)
    file was inspired and 
    adpated from the following tutorial
    https://www.youtube.com/watch?v=nUUsUAPEjFc
*/

// Menu (Sidebar) Toggle
const toggle = document.querySelector('.dashboard-toggle');
const navigation = document.querySelector('.dashboard-navigation');
const main = document.querySelector('.dashboard-main');

toggle.onclick = function() {
    navigation.classList.toggle('active');
    main.classList.toggle('active');
}

// Add hovered class in selected div for selected list item
const list = document.querySelectorAll('.dashboard-navigation li');

function activeLink() {
    list.forEach((item) => item.classList.remove('hovered'));
    this.classList.add('hovered');
}

list.forEach((item) => item.addEventListener('mouseover', activeLink));

