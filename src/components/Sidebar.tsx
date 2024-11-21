import React, { useState, useRef, useCallback, useEffect } from "react";
import styled from "styled-components";

interface SidebarProps {
  initialWidth?: number;
  minWidth?: number;
  maxWidth?: number;
}

const SidebarContainer = styled.div<{ width: number }>`
  display: flex;
  flex-direction: column;
  background-color: #f4f4f4;
  border-right: 1px solid #ccc;
  position: relative;
  width: ${(props) => props.width}px;
  overflow: hidden;
`;

const SidebarContent = styled.div`
  flex: 1;
  padding: 1rem;
  color: #333;
`;

const SidebarResizer = styled.div<{ dragging: boolean }>`
  width: 5px;
  cursor: ew-resize;
  background-color: #ddd;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: blue; /* Hover state */
  }

  ${(props) =>
    props.dragging &&
    `
    background-color: darkblue; /* Dragging state */
  `}
`;

export const Sidebar: React.FC<SidebarProps> = ({
  initialWidth = 268,
  minWidth = 100,
  maxWidth = 600,
}) => {
  const sidebarRef = useRef<HTMLDivElement>(null);
  const [isResizing, setIsResizing] = useState(false);
  const [sidebarWidth, setSidebarWidth] = useState(initialWidth);

  const startResizing = useCallback(() => {
    setIsResizing(true);
  }, []);

  const stopResizing = useCallback(() => {
    setIsResizing(false);
  }, []);

  const resize = useCallback(
    (mouseMoveEvent: MouseEvent) => {
      if (isResizing && sidebarRef.current) {
        const newWidth =
          mouseMoveEvent.clientX -
          sidebarRef.current.getBoundingClientRect().left;

        if (newWidth >= minWidth && newWidth <= maxWidth) {
          setSidebarWidth(newWidth);
        }
      }
    },
    [isResizing, minWidth, maxWidth]
  );

  useEffect(() => {
    window.addEventListener("mousemove", resize);
    window.addEventListener("mouseup", stopResizing);

    return () => {
      window.removeEventListener("mousemove", resize);
      window.removeEventListener("mouseup", stopResizing);
    };
  }, [resize, stopResizing]);

  return (
    <SidebarContainer ref={sidebarRef} width={sidebarWidth}>
      <SidebarContent>Sidebar Content</SidebarContent>
      <SidebarResizer
        dragging={isResizing}
        onMouseDown={startResizing}
      />
    </SidebarContainer>
  );
};

export default Sidebar;
