## 力导向布局 基于 [d3-force](https://github.com/d3/d3-force/tree/v1.2.1)

### todolist

- [ ] 静态布局
- [ ] web worker


### api
`new Gamma(option)`

#### option
* graph {nodes, links}
* container 渲染容器
* graphSettings：
```
    nodeSize: 节点大小;
    nodeColor: 节点颜色;
    hoverNodeColor: 鼠标悬停颜色;
    hoverLabelColor: 文字颜色;
    hoverLabel: 显示文字的键;
```
* width
* height
* legend 图例
* tooltip 提示
* onEnd 结束时的回调
