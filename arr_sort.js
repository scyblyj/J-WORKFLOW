// 冒泡排序
function bubSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length; j++) {
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
            }
        }
    }
    return arr;
}

// 选择性排序
function selectSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        let idx = i;
        for (let j = i; j < arr.length; j++) {
            if (arr[j - 1] > arr[j]) {
                idx = j
            }
        }
        [arr[i], arr[idx]] = [arr[idx], arr[i]];
    }
    return arr;
}

// 插入性排序
function insertSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = i; j >= 0; j--) {
            if (arr[j + 1] < arr[j]) {
                [arr[j + 1], arr[j]] = [arr[j], arr[j + 1]];
            }
        }
    }
    return arr;
}

console.log(insertSort([1, 3, 5, 2, 0, 4, 6]));