/* eslint-disable @next/next/no-img-element */
import { Mail, Phone, MapPin, Github, Calendar } from "lucide-react";
import { PersonalInfo } from "../../types/cv";

interface HeaderProps {
  data: PersonalInfo;
  primaryColor?: string;
}

export const CVHeader: React.FC<HeaderProps> = ({
  data,
  primaryColor = "#1e40af",
}) => {
  return (
    <div id="cv-header" className="flex flex-row gap-5 items-stretch pb-2 border-b border-gray-100 print:flex-row">
      {/* Avatar */}
      <div id="cv-avatar" className="w-40 min-h-[160px] self-stretch bg-gray-200 rounded overflow-hidden flex-shrink-0 border-2 border-gray-100 shadow-sm relative print:w-[140px] print:h-[180px] mt-2">
        {data.avatar ? (
          <img
            src={data.avatar}
            alt={data.fullName}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
            <span className="text-xs text-center px-2">Avatar Room</span>
          </div>
        )}
      </div>

      <div className="flex-1">
        <h1
          className="text-4xl font-bold tracking-tight uppercase leading-none"
          style={{ color: primaryColor }}
        >
          {data.fullName}
        </h1>
        <p className="text-xl font-semibold mt-2 text-gray-700 uppercase tracking-widest border-l-4 pl-3" style={{ borderLeftColor: primaryColor }}>
          {data.title}
        </p>

        <div className="grid grid-cols-1 gap-y-1.5 mt-4">
          <div className="flex items-start gap-2 text-gray-800">
            <MapPin
              className="w-4 h-4 flex-shrink-0 mt-0.5"
              style={{ color: primaryColor, fill: `${primaryColor}30` }}
            />
            <span className="font-bold min-w-[70px]">Address:</span>
            <span>{data.address}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Phone
              className="w-4 h-4"
              style={{ color: primaryColor, fill: `${primaryColor}30` }}
            />
            <span className="font-bold min-w-[70px]">Phone:</span>
            <span>{data.phone}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Calendar
              className="w-4 h-4"
              style={{ color: primaryColor, fill: `${primaryColor}30` }}
            />
            <span className="font-bold min-w-[70px]">Birth:</span>
            <span>{data.birthDate}</span>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Mail
              className="w-4 h-4"
              style={{ color: primaryColor, fill: `${primaryColor}30` }}
            />
            <span className="font-bold min-w-[70px]">Email:</span>
            <a
              href={`mailto:${data.email}`}
              className="hover:opacity-70 transition-opacity"
              style={{ color: primaryColor }}
            >
              {data.email}
            </a>
          </div>
          <div className="flex items-center gap-2 text-gray-800">
            <Github
              className="w-4 h-4"
              style={{ color: primaryColor, fill: `${primaryColor}30` }}
            />
            <span className="font-bold min-w-[70px]">Github:</span>
            <a
              href={data.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-70 transition-opacity underline"
              style={{ color: primaryColor }}
            >
              {data.github}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
