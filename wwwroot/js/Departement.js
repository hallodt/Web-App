$(document).ready(function () {

    $('#tableDepartement').DataTable({

        ajax: {
            url: 'https://localhost:7068/api/Departement',
            type: "GET",        
            dataSrc: 'data',
            headers: {
                'Authorization': "Bearer " + sessionStorage.getItem("token"),
            },
        },
        columns: [
            { data: 'id',},
            { data: 'nama',},
            { data: 'divisionID',},
            {
                data: null,
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" onclick="detailDepartement('${data.id}')" data-bs-toggle="modal" data-bs-target="#detailModal">Detail</button>
                    <button type="button" class="btn btn-primary" onclick="editDepartement('${data.id}')" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                    <button type="button" class="btn btn-danger" onclick="deleteDepartement('${data.id}')">Hapus</button>`;
                }
            }

        ],

        "dom": 'Blrtip',
        buttons: ['colvis',

            {
                extend: 'pdf',
                exportOptions: {
                    columns: ':visible'
                }
            },

            {
                extend: 'excelHtml5',
                exportOptions: {
                    columns: ':visible'
                }
            }
        ]

    });


    $.ajax({
        url: 'https://localhost:7068/api/Departement',
        headers: {
            'Authorization': "Bearer " + sessionStorage.getItem("token"),
        },
    }).done((data) => {
        console.log(data);
        var divisionID = data.data
            .map(x => ({ divisionID: x.divisionID }));
        var { divisionID1, divisionID2, divisionID3, divisionID4 } = divisionID.reduce((previous, current) => {
            if (current.divisionID === 1) {
                //... adalah spread operator
                // spread untuk memecah array-nya 
                return { ...previous, divisionID1: previous.divisionID1 + 1 }
            }

            if (current.divisionID === 2) {
                return { ...previous, divisionID2: previous.divisionID2 + 1 }
            }

            if (current.divisionID === 3) {
                return { ...previous, divisionID3: previous.divisionID3 + 1 }
            }

            if (current.divisionID === 4) {
                return { ...previous, divisionID4: previous.divisionID4 + 1 }
            }
        }, { divisionID1: 0, divisionID2: 0, divisionID3: 0, divisionID4: 0 })

        var options = {
            series: [divisionID1, divisionID2, divisionID3, divisionID4],
            chart: {
                width: 400,
                height:'200%',
                type: 'pie',
            },
            labels: ['Division Id: 1', 'Division Id: 2', 'Division Id: 3', 'Division Id: 4'],
            responsive: [{
                breakpoint: 480,
                options: {
                    chart: {
                        width: 500
                    },
                    legend: {
                        show: true,
                        position: 'right',
                    }
                }
            }]
        };

        var options2 = {
            series: [{
                data: [divisionID1, divisionID2, divisionID3, divisionID4],
            }],
            chart: {
                height: 285,
                type: 'bar',
                events: {
                    click: function (chart, w, e) {
                        // console.log(chart, w, e)
                    }
                }
            },
            plotOptions: {
                bar: {
                    columnWidth: '45%',
                    distributed: true,
                }
            },
            dataLabels: {
                enabled: false
            },
            legend: {
                show: false
            },
            xaxis: {
                categories: [
                    ['Division Id: 1'],
                    ['Division Id: 2'],
                    ['Division Id: 3'],
                    ['Division Id: 4'],
                ],
                labels: {
                    style: {
                        fontSize: '12px'
                    }
                }
            }
        };

        var options3 = {
            series: [{
                data: [divisionID1, divisionID2, divisionID3, divisionID4],
            }],
            chart: {
                height: 350,
                type: 'line',
                zoom: {
                    enabled: false
                }
            },
            dataLabels: {
                enabled: false
            },
            stroke: {
                curve: 'straight'
            },
            title: {
                text: 'Jumlah Division Pada Departement',
                align: 'left'
            },
            grid: {
                row: {
                    colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
                    opacity: 0.5
                },
            },
            xaxis: {
                categories: ['Division Id: 1', 'Division Id: 2', 'Division Id: 3', 'Division Id: 4'],
            }
        };

        var chart = new ApexCharts(document.querySelector("#chartPie"), options);
        var chartBar = new ApexCharts(document.querySelector("#chartBar"), options2);
        var chartLine = new ApexCharts(document.querySelector("#chartLine"), options3);
        chart.render();
        chartBar.render();
        chartLine.render()
    });
});


function detailDepartement(id) {
    $.ajax({
        url: `https://localhost:7068/api/Departement/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
            <input type="hidden" class="form-control" id="hideId" placeholder="" value="0">
            <h5>ID<h5><input type="text" class="form-control" id="departId" value="${res.data.id}" readonly>
            <h5>Nama Departement<h5><input type="text" class="form-control" id="departNama" value="${res.data.nama}">
            <h5>Division ID<h5><input type="text" class="form-control" id="departDivisionID" value="${res.data.divisionID}" readonly>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            `;
        $("#detailData").html(temp);

    }).fail((err) => {
        console.log(err);
    });
}

function editDepartement(id) {
    $.ajax({
        url: `https://localhost:7068/api/Departement/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
            <input type="hidden" class="form-control" id="hideId" placeholder="" value="0">
            <h5>ID<h5><input type="text" class="form-control" id="departId" value="${res.data.id}" readonly>
            <h5>Nama Departement<h5><input type="text" class="form-control" id="departNama" value="${res.data.nama}">
            <h5>Division ID<h5><input type="text" class="form-control" id="departDivisionID" value="${res.data.divisionID}">
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="editBtn" onclick="saveEditDepartement('${res.data.id}')">Simpan Perubahan</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            `;
        $("#editData").html(temp);

    }).fail((err) => {
        console.log(err);
    });
}

function saveEditDepartement(id) {
    var Id = id;
    var Nama = $('#departNama').val();
    var DivisionID = parseInt($('#departDivisionID').val());

    var res = {Id, Nama, DivisionID};
    $.ajax({
        url: 'https://localhost:7068/api/Departement',
        type: "PUT",
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(res),
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Update!',
                text: 'Data berhasil diupdate.',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(function () {
                location.reload();
            }, 1500);
        },
        error: function () {

        }
    });
}

function deleteDepartement(id) {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            $.ajax({
                url: `https://localhost:7068/api/Departement?Id=${id}`,
                type: "DELETE",
                contentType: "application/json",
                success: function () {
                    Swal.fire({
                        icon: 'success',
                        title: 'Hapus!',
                        text: 'Data berhasil dihapus.',
                        showConfirmButton: false,
                        timer: 1500
                    });
                    setTimeout(function () {
                        location.reload();
                    }, 1500);
                },
                error: function () {
                }
            });
        }
    });
}

function addDepartement() {
    let data;
    let id = 0;
    let nama = $('#namaDepartement').val()
    let divisionID = $('#divisionID').val()

    data = {
        "id": id,
        "nama": nama,
        "divisionID": divisionID
    };

    $.ajax({
        url: 'https://localhost:7068/api/Departement',
        type: 'POST',
        data: JSON.stringify(data),
        dataType: 'json',
        headers: {
            'Content-Type': 'application/json'
        },
        success: function () {
            Swal.fire({
                icon: 'success',
                title: 'Data Berhasil Ditambahkan',
                showConfirmButton: false,
                timer: 1500
            });
            setTimeout(function () {
                location.reload();
            }, 1500);
        }
    });
}
