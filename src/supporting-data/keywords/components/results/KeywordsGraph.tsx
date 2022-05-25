import { useEffect, useRef } from 'react';

const KeywordsGraph = ({ data }) => {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!data) {
      return;
    }
  }, [data]);

  return (
    <>
      <svg ref={svgRef} className="dag"></svg>
    </>
  );
};

export default KeywordsGraph;
