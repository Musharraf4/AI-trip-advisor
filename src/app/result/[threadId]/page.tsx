import Result from "@/components/result";

const ResultPage = ({ params: { threadId } }: { params: { threadId: string } }) => (
  <Result threadId={threadId} />
);

export default ResultPage;
