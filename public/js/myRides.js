function showDropDown(){
	let dropdown=document.querySelector(".myrides_dropdown");
	dropdown.classList.toggle("invisible");
}

function main(){
	let dot=document.querySelector(".myrides-dot");
	dot.addEventListener("click",showDropDown);
}
main()