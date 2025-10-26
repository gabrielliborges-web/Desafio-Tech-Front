interface InfoCardProps {
    title: string;
    content: React.ReactNode;
}

export default function InfoCard({ title, content }: InfoCardProps) {
    return (
        <div className="bg-[#232225]/60  blur-[0.5px] border border-[#ebeaf8]/[0.08] rounded-md p-4 flex flex-col gap-2">
            <h3 className="text-sm font-semibold text-text-primary-dark uppercase">
                {title}
            </h3>
            <div className="text-sm text-gray-300">{content}</div>
        </div>
    );
}
