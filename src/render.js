import Konva from "konva";

export const NODE_SPACE = 50;
const SIZE = 800;

let layer = null;
// 初始化舞台
export const init = (drawBox) => {
  let stage = new Konva.Stage({
    container: drawBox.value,
    width: SIZE,
    height: SIZE,
  });
  layer = new Konva.Layer();
  stage.add(layer);
  renderGrid(stage);
};
// 绘制辅助网格
const renderGrid = (stage) => {
  let gridLayer = new Konva.Layer();
  stage.add(gridLayer);
  for (let i = 0; i < SIZE; i += NODE_SPACE / 2) {
    let line = new Konva.Line({
      points: [i, 0, i, SIZE],
      stroke: "rgba(0,0,0,0.1)",
      strokeWidth: 1,
    });
    gridLayer.add(line);
    let line2 = new Konva.Line({
      points: [0, i, SIZE, i],
      stroke: "rgba(0,0,0,0.1)",
      strokeWidth: 1,
    });
    gridLayer.add(line2);
  }
  gridLayer.draw();
};
// 绘制节点
export const drawNode = (x, y, name, w, h) => {
  // let circle = new Konva.Circle({
  //   x,
  //   y,
  //   radius: 10,
  //   fill: "#fff",
  //   stroke: "black",
  //   strokeWidth: 2,
  // });
  let width = w || 30
  let height = h || 20
  let rect = new Konva.Rect({
    x,
    y: y - height / 2,
    width,
    height,
    fill: '#fff',
    stroke: 'black',
    strokeWidth: 2
  });
  layer.add(rect);
  let text = new Konva.Text({
    x: x,
    y: y,
    text: name,
    fontSize: 14,
  });
  text.offsetX(-(width - text.width()) / 2);
  text.offsetY(text.height() / 2);
  layer.add(text);
  layer.draw();
};
// 绘制连接线
export const drawLine = (a, b) => {
  let line = new Konva.Line({
    points: [a.x, a.y, b.x, b.y],
    stroke: "black",
    strokeWidth: 2,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(line);
  layer.draw();
};
// 绘制思维导图连接线
export const drawMindLine = (a, b) => {
  let line = new Konva.Line({
    points: [
      a.x + a.width, a.y, 
      b.x - 20, a.y,
      b.x - 20, b.y,
      b.x, b.y
    ],
    stroke: "black",
    strokeWidth: 2,
    lineCap: "round",
    lineJoin: "round",
  });
  layer.add(line);
  layer.draw();
};

// 绘制二叉树
export const renderbinaryTreeData = (tree) => {
  if (tree.left_child) {
    drawLine(tree, tree.left_child);
    renderbinaryTreeData(tree.left_child);
  }
  if (tree.right_child) {
    drawLine(tree, tree.right_child);
    renderbinaryTreeData(tree.right_child);
  }
  drawNode(tree.x, tree.y, tree.name, tree.width, tree.height);
};
// 绘制多叉树
export const renderTree = (tree) => {
  tree.children.forEach((child) => {
    // drawLine(tree, child);
    drawMindLine(tree, child)
    renderTree(child);
  });
  drawNode(tree.x, tree.y, tree.name, tree.width, tree.height);
};
// 处理树数据
export const handleTree = (tree) => {
  tree.x *= NODE_SPACE;
  tree.x += NODE_SPACE;

  tree.y *= NODE_SPACE;
  tree.y += NODE_SPACE;

  tree.children.forEach((child) => {
    handleTree(child);
  });
};
