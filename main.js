class Node {
  constructor(data) {
    this.data = data;
    // 자식 요소를 담을 배열
    this.children = [];
  }
}

class Tree {
  constructor() {
    // 제일 첫번째 요소 => root 초기값 null
    this.root = null;
  }

  // Node를 추가함.
  addNode(childNode, parentNode) {
    const node = new Node(childNode);
    // 부모 요소가 존재하는 지 찾기
    // 부모 노드가 없다면 null의 값을 가짐.
    const parent = parentNode ? this.findNode(parentNode) : null;
    if (parent) {
      // 부모 요소가 존재한다면, 자식 요소 넣기
      parent.children.push(node);
    } else {
      if (!this.root) {
        // 부모 요소가 존재하지 않고, root 가 null이라면 시작점이라는 소리이므로
        // 현재 노드가 루트 요소
        this.root = node;
      } else {
        return "";
      }
    }
  }

  findNode(value) {
    // 노드를 찾기.
    let _node = null;

    this.searchNode((node) => {
      // 콜백 함수로 전달하여
      // Node의 데이터가 인자로 들어온 노드와 같다면, _node에 저장하여 반환
      if (node.data === value) {
        _node = node;
      }
    });
    return _node;
  }

  searchNode(fn) {
    // 노드를 순회하여 검색
    const root = [this.root]; // 검색의 시작점

    if (fn) {
      while (root.length) {
        // root 요소의 자식 요소 개수만큼 반복

        const node = root.shift(); // 순회하며 검색할 노드를 꺼냄.
        fn(node); // root 요소의 자식 노드를 순회하며 부모 노드와 같은 지 비교.
        for (const child of node.children) {
          // 검색할 노드의 자식요소를 나열
          // root에 자식 요소를 넣기
          root.push(child);
        }
      }
    }
  }
}

const stringArr = ["t", "ti", "te", "tie", "tiger", "test", "team", "tictok"];

const tree = new Tree(); // 새로운 트리 생성
/* 알파벳 별로 분류
  t > 시작점
  ti, te 라는 자식 요소를 가짐.
  ti > tie, tiger, tictok 자식 요소를 가짐
  te > test, team 자식 요소를 가짐
*/
tree.addNode(stringArr[0]);
tree.addNode(stringArr[1], stringArr[0]);
tree.addNode(stringArr[2], stringArr[0]);
tree.addNode(stringArr[3], stringArr[1]);
tree.addNode(stringArr[4], stringArr[1]);
tree.addNode(stringArr[5], stringArr[2]);
tree.addNode(stringArr[6], stringArr[2]);
tree.addNode(stringArr[7], stringArr[1]);

tree.searchNode((node) => {
  // 트리를 순회하여 console.log 찍기
  console.log(node);
});
