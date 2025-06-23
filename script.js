const input = document.querySelector("#input");
const addBtn = document.querySelector(".add");
const itemName = document.querySelector(".item-name");
const itemContainer = document.querySelector(".item-container")
const saveBtn = document.querySelector(".save");
const todoData = [];

addBtn.addEventListener("click",()=>{
    console.log(input)
    itemContainer.innerHTML="";
    const val = input.value.trim();
    const obj = {
        val,
        id:`${Math.random()}`
    }
    todoData.push(obj);
    updateItemContainer();
})
function updateItemContainer(){
    itemContainer.innerHTML="";
    todoData.forEach((data)=>{
        const div = document.createElement("div");
        div.classList.add("item","flex","gap-4");
        div.innerHTML=`
                <div class="item-name" contenteditable="false" >${data.val}</div>
                <div class="edit" id="${data.id}">Edit</div>
                <div class="del">Del</div>
        `;
        itemContainer.appendChild(div);
    })
}
itemContainer.addEventListener("click",(e)=>{
    if(e.target.classList.contains("edit")){
    input.value=e.target.parentElement.firstElementChild.textContent;
    input.focus();
    addBtn.classList.add("hidden");
    saveBtn.classList.toggle("hidden");
    saveBtn.id=e.target.id;
    }
    else if(e.target.classList.contains("del")){
        let id = e.target.parentElement.children[1].id;
        let ind=-1;
        todoData.forEach((data,index)=>{
            if(data.id==id){
                ind=index;
            }
        })
        if(ind!=-1){
            todoData.splice(ind,1);
        }
        updateItemContainer();
    }
})
saveBtn.addEventListener("click",()=>{
    let id = saveBtn.id;
    todoData.forEach((data)=>{
        if(data.id==id){
            data.val=input.value;
        }
    })
    input.value="";
    updateItemContainer();
    saveBtn.classList.toggle("hidden");
    addBtn.classList.toggle("hidden");
})

