import constate from 'constate';
import React from 'react';

const constateCluster = (...hooks) => {
  const CombineProvid = ({ children, operator }) => {
    let Child = children;
    const hookProviderKeys = Object.keys(operator.providers);
    for (let i = 0; i < hookProviderKeys.length; i++) {
      const Provider = operator.providers[hookProviderKeys[i]];
      Child = <Provider>{Child}</Provider>;
    }

    return <div>{Child}</div>;
  };

  const createConstateTable = (hookQueue) => {
    const constateTable = {
      providers: {},
      contexts: {},
    };
    hookQueue.forEach((hook) => {
      const [Provider, Context] = constate(hook);
      constateTable.providers[`${hook.name}Provider`] = Provider;
      constateTable.contexts[`${hook.name}Context`] = Context;
    });
    return constateTable;
  };

  const operator = createConstateTable(hooks);

  const Provider = ({ children }) => <CombineProvid operator={operator}>{children}</CombineProvid>;

  return {
    Provider,
    ...operator.contexts,
  };
};

export default constateCluster;
