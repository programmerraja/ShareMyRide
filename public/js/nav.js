
function main2(){
	let arrow=document.querySelector(".home_arrow");
	if(arrow){
	 	arrow.addEventListener("click",showHomeDropDown);
	 	function showHomeDropDown(){
			 let profile_dropdown=document.querySelector(".home_dropdown");
		 	 arrow.classList.toggle("rotate");
			 profile_dropdown.classList.toggle("invisible");
		}
	}
}


function main(){
 let arrow=document.querySelector(".arrow");
 if(arrow){
 	 arrow.addEventListener("click",showDropDown);
	 function showDropDown(){
		 let profile_dropdown=document.querySelector(".profile_dropdown");
		 arrow.classList.toggle("rotate");
		 profile_dropdown.classList.toggle("invisible");
	}
  }
}
main()
main2();