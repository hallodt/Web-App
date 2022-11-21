$(document).ready(function () {

    $('#tableDivision').DataTable({

        ajax: {
            url: 'https://localhost:7068/api/Division',
            dataSrc: 'data',
            "headers": {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            "type": "GET"

        },
        columns: [
            { data: 'id', },
            { data: 'nama', },
            {
                data: null,
                "render": function (data, type, row, meta) {
                    return `<button type="button" class="btn btn-primary" onclick="detailDivision('${data.id}')" data-bs-toggle="modal" data-bs-target="#detailModal">Detail</button>
                    <button type="button" class="btn btn-primary" onclick="editDivision('${data.id}')" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                    <button type="button" class="btn btn-danger" onclick="deleteDivision('${data.id}')">Hapus</button>`;
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
});

function detailDivision(id) {
    $.ajax({
        url: `https://localhost:7068/api/Division/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
            <input type="hidden" class="form-control" id="hideId" placeholder="" value="0">
            <h5>ID<h5><input type="text" class="form-control" id="divId" value="${res.data.id}" readonly>
            <h5>Nama Division<h5><input type="text" class="form-control" id="divNama" value="${res.data.nama}">
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            `;
        $("#detailData").html(temp);

    }).fail((err) => {
        console.log(err);
    });
}

function editDivision(id) {
    $.ajax({
        url: `https://localhost:7068/api/Division/${id}`,
        type: "GET"
    }).done((res) => {
        let temp = "";
        temp += `
            <input type="hidden" class="form-control" id="hideId" placeholder="" value="0">
            <h5>ID<h5><input type="text" class="form-control" id="diviId" value="${res.data.id}" readonly>
            <h5>Nama Departement<h5><input type="text" class="form-control" id="diviNama" value="${res.data.nama}">
                <div class="modal-footer">
                    <button type="button" class="btn btn-primary" id="editBtn" onclick="saveEdit('${res.data.id}')">Simpan Perubahan</button>
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                </div>
            `;
        $("#editData").html(temp);

    }).fail((err) => {
        console.log(err);
    });
}

function saveEdit(id) {
    var Id = id;
    var Nama = $('#diviNama').val();

    var res = { Id, Nama };
    $.ajax({
        url: 'https://localhost:7068/api/Division',
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

function deleteDivision(id) {
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
                url: `https://localhost:7068/api/Division?Id=${id}`,
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

function addDivision() {
    let data;
    let id = 0;
    let nama = $('#namaDivision').val()

    data = {
        "id": id,
        "nama": nama,
    };

    $.ajax({
        url: 'https://localhost:7068/api/Division',
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