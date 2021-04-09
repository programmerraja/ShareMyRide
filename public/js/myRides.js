function showDropDown(e){
	let index=e.target.attributes.index.value;
	let dropdown=document.querySelector(".index"+index);
	dropdown.classList.toggle("invisible");
}

function main(){
	let dot=document.querySelectorAll(".myrides-dot");
	for(let i=0;i<dot.length;i++){
		dot[i].addEventListener("click",(e)=>{showDropDown(e)});
	}
}
main()