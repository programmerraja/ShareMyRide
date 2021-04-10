function showDropDown(e){
	let index=e.target.attributes.index.value;
	let dropdown=document.querySelector(".index"+index);
	dropdown.classList.toggle("invisible");
}

async function removeRide(e){
	let id=e.target.attributes.id.value;
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
				let success_text=document.querySelector(".bg-success");
				console.log(success_text,res)
				success_text.innerText=res.msg;
				success_text.classList.toggle("d-none");
				e.target.parentElement.parentElement.parentElement.style.display="none";
			}
			else{
				let danger_text=document.querySelector(".bg-danger");
				danger_text.innerText=res.msg;
				danger_text.classList.toggle("d-none");
				
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