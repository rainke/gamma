import Gamma from 'gamma';
import {GammaNode, GammaLink} from '../src/types'

interface CustomNode extends GammaNode {
  test: 'string'
}

fetch('./g.json').then(res => res.json()).then(data => {
  var g = new Gamma<CustomNode>({
    graph: { nodes: data.nodes, links: data.edges },
    container: '#mount',
    graphSettings: {
      hoverLabel: 'id'
    },
    height: 500,
    onEnd() {
      console.log('end');
    },
    legend: [{
      color: 'red',
      name: '老师'
    }, {
      color: 'blue',
      name: '学生'
    }],
    tooltip: {
      format(node) {
        return JSON.stringify(node, null, 2)
      }
    }
  });
  // @ts-ignore 调试
  window.g = g;
})


