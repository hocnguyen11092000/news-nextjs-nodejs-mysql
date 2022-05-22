export const handleSubView = (data) => {
  data &&
    data.forEach((item) => {
      if (item.parentId !== 0) {
        let parent = data.find((x) => x.id === item.parentId);
        parent.sub = parent.sub || [];
        parent.sub.push(item);
      }
    });

  return (data = data.filter((x) => x.parentId === 0));
};
