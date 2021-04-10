function showDropDown(e){
	let index=e.target.attributes.index.value;
	let dropdown=document.querySelector(".index"+index);
	dropdown.classList.toggle("invisible");
}

async function removeRide(e){
	let id=e.target.attributes.id.value;
	let popup_container=document.querySelector(".popup_container");
	if(id){
			let body=JSON.stringify({"id":id});
			let res=await fetch("/user/remove/myride/",{
													method:"post",
													headers:{"Content-Type":"application/json"},
													body:body
												}
									);

			res=await res.json();
			if(res.status==="Sucess"){
				popup_container.style.display="flex";
				popup_container.children[0].children[0].innerText=res.msg;	
				e.target.parentElement.parentElement.parentElement.style.display="none";
			}
			else{
				popup_container.style.display="flex";
				popup_container.children[0].children[0].innerText=res.msg;	
				
			}
	}

}
function main(){
	let dot=document.querySelectorAll(".myrides-dot");
	for(let i=0;i<dot.length;i++){
		dot[i].addEventListener("click",(e)=>{showDropDown(e)});
	}
	let remove_text=document.querySelector(".myrides_dropdown-option2");
	if(remove_text){
		remove_text.addEventListener("click",(e)=>{removeRide(e)});
	}

}
main()