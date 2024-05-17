// Simpan nilai-nilai yang telah dimasukkan sebelumnya
var previousRows = 3;
var previousCols = 3;
var previousMatrix = [];

// Simpan elemen input awal
var initialMatrixInput = `
  <div class="row">
    <input type="number" id="rows" name="rows" class="form-control" value="3">
  </div>
  <div class="row">
    <input type="number" id="cols" name="cols" class="form-control" value="3">
  </div>
`;

// Fungsi untuk menghasilkan matriks berdasarkan jumlah baris dan kolom yang dimasukkan
function generateMatrix() {
    var rows = parseInt(document.getElementById("rows").value);
    var cols = parseInt(document.getElementById("cols").value);
  
    var matrixInput = document.getElementById("matrixInput");
    matrixInput.innerHTML = "";
  
    // Simpan nilai-nilai sebelumnya
    previousRows = rows;
    previousCols = cols;
    previousMatrix = [];
  
    for (var i = 0; i < rows; i++) {
        var row = document.createElement("div");
        row.className = "row";
        var rowData = [];
        for (var j = 0; j < cols; j++) {
            var input = document.createElement("input");
            input.setAttribute("type", "number");
            input.setAttribute("id", "cell_" + i + "_" + j);
            input.className = "form-control";
            input.value = ""; // Set nilai input menjadi kosong
            row.appendChild(input);
            rowData.push(input.value);
        }
        matrixInput.appendChild(row);
        previousMatrix.push(rowData);
    }
}

// Menambahkan event listener untuk tombol "Generate Matrix"
document.getElementById("generateBtn").addEventListener("click", generateMatrix);

// Menambahkan event listener untuk tombol "Calculate Determinant"
document.getElementById("calculateBtn").addEventListener("click", calculateDeterminant);

// Fungsi untuk menghitung determinan matriks menggunakan metode rekursif
function calculateDeterminant() {
    var matrix = [];
    for (var i = 0; i < previousRows; i++) {
        var rowData = [];
        for (var j = 0; j < previousCols; j++) {
            var input = document.getElementById("cell_" + i + "_" + j);
            rowData.push(parseFloat(input.value)); // Konversi nilai input menjadi angka
        }
        matrix.push(rowData);
    }

    var determinant = computeDeterminant(matrix);
    document.getElementById("result").innerText = "Determinant: " + determinant;
}

// Fungsi rekursif untuk menghitung determinan matriks
function computeDeterminant(matrix) {
    var rows = matrix.length;
    var cols = matrix[0].length;

    if (rows !== cols) {
        return "Matrix is not square!";
    }

    if (rows === 1) {
        return matrix[0][0];
    }

    if (rows === 2) {
        return matrix[0][0] * matrix[1][1] - matrix[0][1] * matrix[1][0];
    }

    var determinant = 0;
    for (var j = 0; j < cols; j++) {
        determinant += matrix[0][j] * cofactor(matrix, 0, j);
    }

    return determinant;
}

// Fungsi untuk menghitung kofaktor dari elemen di baris i dan kolom j
function cofactor(matrix, i, j) {
    var subMatrix = [];
    for (var row = 0; row < matrix.length; row++) {
        if (row !== i) {
            var newRow = [];
            for (var col = 0; col < matrix[row].length; col++) {
                if (col !== j) {
                    newRow.push(matrix[row][col]);
                }
            }
            subMatrix.push(newRow);
        }
    }
    return Math.pow(-1, i + j) * computeDeterminant(subMatrix);
}

// Menambahkan event listener untuk tombol "Reset"
document.getElementById("resetBtn").addEventListener("click", resetMatrix);

// Fungsi untuk mereset matriks ke tampilan awal
function resetMatrix() {
    // Mengembalikan tampilan ke tampilan awal
    document.getElementById("matrixInput").innerHTML = initialMatrixInput;
    document.getElementById("result").innerText = "";
    document.getElementById("rows").value = 3;
    document.getElementById("cols").value = 3;

    // Set nilai-nilai sebelumnya kembali ke nilai awal
    previousRows = 3;
    previousCols = 3;
    previousMatrix = [];
}