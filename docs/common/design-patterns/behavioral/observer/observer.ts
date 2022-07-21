import { Subject } from 'rxjs';

const news = new Subject();
news.subscribe((n) => console.log(n, ' 1'));
news.subscribe((n) => console.log(n, ' 2'));
news.subscribe((n) => console.log(n, ' 3'));

news.next(1);
news.next(2);
news.next(3);
news.complete();

export { news };
