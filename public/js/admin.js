var popup_container=document.querySelector(".popup_container");


async function removeUser(event,is_verifiy=false)
	{
		document.querySelector(".loading_wrapper").classList.toggle("invisible");
		let user_id=event.target.id;
		let body=JSON.stringify({user_id:user_id});
		if(is_verifiy){
			
			var res=await fetch("/admin/dashboard/user/verifiy/",{
											method:"post",
											headers:{"Content-Type":"application/json"},
											body:body});
		}
		else{

			var res=await fetch("/admin/dashboard/user/remove/",{
											method:"post",
											headers:{"Content-Type":"application/json"},
											body:body});
		
		}
		res=await res.json();
		if(res.status==="Sucess")
		{
			popup_container.style.display="flex";
			popup_container.children[0].children[0].innerText=res.error_msg;
			fetchUser();

		}
		else
		{
			popup_container.style.display="flex";
			popup_container.children[0].children[0].innerText=res.error_msg;
			fetchUser();
		}
		
	}

  
	function insertToTable(obj,table){
				let row='<div class="tr">\
						  	<div class="td">'+obj.username+'</a></div>\
						  	<div class="td">'+obj.email+'</div>\
						  	<div class="td">'+obj.email_verified+'</div>\
						  	<div class="td">'+new Date(obj.created_at).toDateString()+'</div>\
						  	<div class="td">'+obj.licenseno+'</div>\
						  	<div class="td">'+obj.phoneno+'</div>\
						  	<div class="td">'+obj.whatsappno+'</div>\
						  	<div class="td">'+obj.drivingexpereince+'</div>\
						  	<div class="td">'+obj.is_verified+'</div>\
						  	<div class="td">\
						  	<input type="button" class="remove_user" value="Remove" id="'+obj.user_id+'">\
						  	</div>\
						  	<div class="td">\
						  	<input type="button" class="verifiy_user" value="Verifiy" id="'+obj.user_id+'">\
						  	</div>\
					  	</div>'
				
				table.innerHTML+=row;
		}

	async function fetchUser()
	{
		var table = document.querySelector(".table");
		var info_text=document.querySelector(".info_text");
		var children=table.children;
		if(children.length>1){
			let length=children.length
			for(let i=0;i<length-1;i++)
			{
				children[1].remove();

			}
		}
		
		let res=await fetch("/admin/dashboard/users/");
		res=await res.json();
		if(res.status=="Sucess")
		{
			if(res["users"]){
			if(res["users"].length>0)
			{
				table.style.display="flex";
				info_text.style.display="none";
				res["users"].forEach((user)=>
				{
					var user_id=user["_id"];
					var username=user["name"];
					var email=user["email"];
					var email_verified=user["is_email_verified"];
					var created_at=user["created_at"];
					var licenseno=user["licenseno"];
					var phoneno=user["phoneno"];
					var whatsappno=user["whatsappno"];
					var drivingexpereince=user["drivingexpereince"];
					var is_verified=user["is_verified"];

					insertToTable({user_id,username,email,email_verified,created_at,licenseno,phoneno,whatsappno,drivingexpereince,is_verified},table);

				});	
			}}	
		
			//after fetching adding listener
			let remove_user=document.querySelectorAll(".remove_user");
			remove_user.forEach((button)=>{button.addEventListener("click",(e)=>{removeUser(e)})});
			let verifiy_user=document.querySelectorAll(".verifiy_user");
			verifiy_user.forEach((button)=>{button.addEventListener("click",(e)=>{removeUser(e,true)})});
		}
	}

 
async function  main() {
		await fetchUser();
		
	}

main()