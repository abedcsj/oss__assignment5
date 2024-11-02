const apiUrl = 'http://localhost:3000/items'; // JSON Server 주소

// READ - 데이터 조회
function fetchData() {
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => displayData(data))
        .catch(error => console.error('Error fetching data:', error));
}

// 데이터 목록 표시
function displayData(items) {
    const content = document.getElementById('content');
    content.innerHTML = ''; // 기존 내용을 초기화

    items.forEach(item => {
        content.innerHTML += `
            <div id="item-${item.id}">
                <p><strong>Name:</strong> ${item.name}</p>
                <p><strong>Description:</strong> ${item.description}</p>
                <p><strong>Price:</strong> $${item.price}</p>
                <p><strong>Quantity:</strong> ${item.quantity}</p>
                <button onclick="editItem(${item.id})">Edit</button>
                <button onclick="deleteItem(${item.id})">Delete</button>
                <hr>
            </div>
        `;
    });
}

// CREATE - 데이터 추가
function createItem() {
    const newItem = {
        name: prompt("Enter item name:"),
        description: prompt("Enter item description:"),
        price: parseFloat(prompt("Enter item price:")),
        quantity: parseInt(prompt("Enter item quantity:"))
    };

    fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newItem)
    })
        .then(response => response.json())
        .then(() => fetchData())
        .catch(error => console.error('Error adding item:', error));
}

// UPDATE - 데이터 수정
function editItem(id) {
    const updatedItem = {
        name: prompt("Update item name:"),
        description: prompt("Update item description:"),
        price: parseFloat(prompt("Update item price:")),
        quantity: parseInt(prompt("Update item quantity:"))
    };

    fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedItem)
    })
        .then(response => response.json())
        .then(() => fetchData())
        .catch(error => console.error('Error updating item:', error));
}

// DELETE - 데이터 삭제
function deleteItem(id) {
    fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    })
        .then(() => fetchData())
        .catch(error => console.error('Error deleting item:', error));
}

// 페이지 로드 시 데이터 조회
fetchData();
