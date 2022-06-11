## B1: Cài đặt thư viện
Tìm đọc chi tiết [tại đây](https://www.npmjs.com/package/debug)
```angular2html
yarn add debug
yarn add -D @types/debug
```

## B2: Thiết lập để test
Import để sử dụng
```angular2html
import debug from 'debug';
```

Định nghĩa `namespace` cho mỗi loại test
```angular2html
const TEST_NAMESPACE = 'Home'
```

Kiểm tra môi trường để có enable chức năng `debug` lên hay không
```angular2html
if (process.env.NODE_ENV == 'testing') {
  debug.enable(TEST_NAMESPACE);
}
```

Khởi tạo 1 test instance để sự dụng
```
const testing = debug(TEST_NAMESPACE);
```
### B3: Thực thi test
Chuẩn bị dữ liệu test với 2 function
```angular2html
  async test1() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('foo');
      }, 300);
    });
  }

  async test2() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve('boo');
      }, 300);
    });
  }
```
Như ta thấy test1 sẽ `timeout` `300ms` rồi trả về giá trị là `foo`, test 2 tương tự và trả về giá trị là `boo`

Ta thực thi test như sau:
```angular2html
@Get('/')
async Home() {
    /**
      Setting bên ngoài khi triển khai thực tế
    **/
    const TEST_NAMESPACE = 'Home';
    const testing = debug(TEST_NAMESPACE);
    if (process.env.NODE_ENV == 'testing') {
      debug.enable(TEST_NAMESPACE);
    }
    /**
      Thực hiện test
    **/
    testing('BeginTest');
    const data1 = await this.test1();
    testing('Step 1:', data1);
    const data2 = await this.test2();
    testing('Step 2:', data2);
    return '0k';
}
```

Kết quả sau khi chạy đoạn function kia
```angular2html
Home BeginTest +0ms
Home Step 1: foo +301ms
Home Step 2: boo +301ms
```

## Tổng kết
- Chúng ta hiển thị kết quả và thời gian thực thi chương trình của ứng dụng
- Viết debug có thể bật tắt tùy ý dựa vào `NODE_ENV`, tránh phải thêm và xóa debug khi lên Production
- Sử dụng Namespace giúp dễ dàng tra cứu log hơn
