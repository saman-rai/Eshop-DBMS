const urlParams = new URLSearchParams(window.location.search);
const staffId = urlParams.get('staff_id');
console.log(staffId)
if (!staffId) {
    window.location.href = '../login/login.html?staff_id=no';
}

document.getElementById('staffProducts').addEventListener('click', function(e) {
    window.location.href = "staff.html?staff_id="+staffId;
});
document.getElementById('staffSales').addEventListener('click', function(e) {
window.location.href = "staffSales.html?staff_id="+staffId;
});
window.onload=function(){
fetch('http://localhost:9000/staff/salesData')
    .then(response => response.json())
    .then(data => {
        let labels = [];
        let salesData = [];

        for(let i = 0; i < data.length; i++) {
            labels.push(data[i].product_name);
            salesData.push(data[i].sales_count);
        }

        let ctx = document.getElementById('myChart').getContext('2d');
        let myChart = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: '# of Sales',
                    data: salesData,
                    backgroundColor: 'rgba(75, 192, 192, 0.2)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1
                }]
            },
            options: {
                responsive: false
            }
        });
    });
}