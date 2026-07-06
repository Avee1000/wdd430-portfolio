interface WorkHistoryProps {
    title: string;
    company: string;
    startDate: string;
    endDate: string;
    description: string;
    skills: string[];
}

export default function WorkHistory({ title, company, startDate, endDate, description, skills }: WorkHistoryProps) {
    return (
        <article className="p-4 border border-gray-600 bg-gray-50 rounded">
            <h3 className=" text-black text-xl font-bold mb-2">{title}</h3>
            <h2 className="text-gray-700 italic text-l font-bold mb-2">{company}</h2>
            <p className="text-sm text-gray-600 mb-3">
                {startDate} - {endDate}
            </p>
            <p className="text-gray-700 mb-3">{description}</p>
            <ul className="flex flex-wrap gap-2"><strong>Skills:</strong>
                {skills.map((skill) => (
                    <li
                        key={skill}
                        className="px-3 py-1 bg-orange-200 text-gray-900 text-sm rounded-full"
                    >
                        {skill}
                    </li>
                ))}
      </ul>
        </article>
    );
}