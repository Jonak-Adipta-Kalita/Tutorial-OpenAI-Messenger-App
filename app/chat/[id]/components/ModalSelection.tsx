"use client";

import useSWR from "swr";

import Select from "react-select";

type Props = {};

const fetchModels = async () =>
  fetch("/api/getEngines").then((res) => res.json());

const ModalSelection = (props: Props) => {
  const { data: models, isLoading } = useSWR("models", fetchModels);
  const { data: model, mutate: setModel } = useSWR("model", {
    fallbackData: "text-davinci-003",
  });

  return (
    <Select
      className="mt-2"
      isSearchable={true}
      isLoading={isLoading}
      menuPosition="fixed"
      classNames={{ control: (state: any) => "bg-[#434654] border-[#434654]" }}
      defaultValue={model}
      placeholder={model}
      options={models?.modelOptions}
      onChange={(e) => setModel(e.value)}
    />
  );
};

export default ModalSelection;
