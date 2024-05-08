import { Allotment } from "allotment";
import "allotment/dist/style.css";
import Header from "./Header";
import CodeEditor from "./CodeEditor";
import Preview from "./Preview";

const ReactPlayground = () => {
  return (
    <div className="w-full h-[100vh] overflow-hidden">
      <Header />
      <Allotment defaultSizes={[100, 100]}>
        <Allotment.Pane minSize={0}>
          <div className="h-full w-full">
            <CodeEditor />
          </div>
        </Allotment.Pane>
        <Allotment.Pane minSize={0}>
          <div>
            <Preview />
          </div>
        </Allotment.Pane>
      </Allotment>
    </div>
  );
};

export default ReactPlayground;
