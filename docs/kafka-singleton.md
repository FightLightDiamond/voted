## Vấn đề
Mỗi lần làm việc với `Kafka` cần khởi tạo kết
```angular2html
const producer = kafka.producer();
await producer.connect();
// do something
producer.disconnect();
```
Nếu sử 1000 lần thì số lượng `connect` và `disconnect` là 1000 lần
Giả sử hệ thống phải xử lý `5k message/s` thì lượng kết nối và `disconnect` sẽ như trên.
Vấn đề đã rõ ràng phải không nào. Thay vì vậy tại sao không có 1 kết nối cho toàn ứng dụng nhỉ?

## Solution
Chúng là nên áp dụng `Singleton Pattern`
1. `private construct`, để ngăn các đối tượng khác sử dụng toán tử `new` với lớp `Singleton`.
2. Tạo thuộc tính `static` để sau này lưu giá trị `singleton`
3. Tạo phương thức `static` xử lý và lưu gia trị vào thuộc tính `static` vừa tạo bên trên


```
import { Consumer, Producer } from 'kafkajs';
import { kafka } from '../configs/kafka';
import { KafkaGroupEnum } from '../constants';

/**
 * Connect Kafka
 */
export class ConnectKafka {
  /**
   * Producer
   * @private
   */
  private static producer: Producer | null = null;

  /**
   * Consumer
   * @private
   */
  private static consumer: Consumer | null = null;

  /**
   * Consumers
   * @private
   */
  private static consumers: Map<string, Consumer> = new Map();

  /**
   * Ngăn chặn khởi tạo
   * @private
   */
  private constructor() {}

  /**
   * Get Producer
   */
  public static async getProducer() {
    if (ConnectKafka.producer == null) {
      const producer = kafka.producer();
      await producer.connect();
      ConnectKafka.producer = producer;
    }

    return ConnectKafka.producer;
  }

  /**
   * Get Consumer
   */
  public static async getConsumer() {
    if (ConnectKafka.consumer == null) {
      const producer = kafka.consumer({
        groupId: KafkaGroupEnum.BETU_CONSUMER,
      });
      await producer.connect();
      ConnectKafka.consumer = producer;
    }

    return ConnectKafka.producer;
  }

  /**
   * Get Consumer By Group Id
   * @param groupId
   */
  public static async getConsumerByGroupId(groupId: string) {
    if (ConnectKafka.consumers.get(groupId) == null) {
      const consumer: Consumer = kafka.consumer({
        groupId: groupId,
      });
      await consumer.connect();
      ConnectKafka.consumers.set(groupId, consumer);
    }

    return ConnectKafka.consumers.get(groupId);
  }
}
```

Như ta thấy khi kết nối ta chỉ cần 
```angular2html
ConnectKafka.getConsumer()
```
Kết nối sẽ được lưu vào
```angular2html
private static producer: Producer | null = null;
```
Vì là `static` nên giá trị lưu lại mà không xóa đi sau khi sử dụng
Như vậy chung ta chỉ cần kết nối 1 lần duy nhất cho ứng dụng
Khi nào thì `disconnect`? Tùy thuộc vào nghiệp vụ của bạn, có những dự án chỉ `disconnect` khi ứng dụng của bạn bị `shutdown` mà thôi
