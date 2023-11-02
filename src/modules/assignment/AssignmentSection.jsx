import { Fragment } from "react";
import { Link } from "react-router-dom";
import { Button } from "../../components/default/Button";
import { UploadDragbleField } from "../../components/assignment/UploadDragbleField";
import { assignment } from "../../data/assignment";

export const AssignmentSection = () => {
  const getMyStudyAssignmentItem = assignment;

  function timestampRemainingHandler(timestamp_taken, deadline) {
    const timestamp_taken_formatted = new Date(timestamp_taken);
    const deadline_formatted = new Date(deadline);

    const time_difference = deadline_formatted.getTime() - timestamp_taken_formatted.getTime();

    if (time_difference < 0) {
      return "Telah melewati batas waktu";
    }

    const seconds = Math.floor(time_difference / 1000) % 60;
    const minutes = Math.floor(time_difference / 1000 / 60) % 60;
    const hours = Math.floor(time_difference / 1000 / 3600) % 24;
    const days = Math.floor(time_difference / 1000 / 3600 / 24);

    return `${days} hari ${hours} jam ${minutes} menit ${seconds} detik`;
  }

  const timestamp_remaining = timestampRemainingHandler(
    getMyStudyAssignmentItem?.student_progress?.timestamp_taken,
    getMyStudyAssignmentItem?.student_progress?.deadline,
  );

  const tabelState = [
    {
      namaTabel: "Status Pengumpulan",
      response:
        getMyStudyAssignmentItem?.student_progress?.assignment_answer === null ||
        getMyStudyAssignmentItem?.student_progress?.assignment_answer.length < 1
          ? "Belum Mengumpulkan"
          : "Terkirim",
    },
    {
      namaTabel: "Status Penilaian",
      response:
        getMyStudyAssignmentItem?.student_progress.score === null
          ? "Belum dinilai"
          : getMyStudyAssignmentItem?.student_progress.score,
    },
    {
      namaTabel: "Tanggal batas pengumpulan ",
      response: getMyStudyAssignmentItem?.student_progress.deadline + " WIB",
    },
    { namaTabel: "Waktu tersisa", response: timestamp_remaining },
    {
      namaTabel: "Terakhir diubah",
      response: getMyStudyAssignmentItem?.student_progress.timestamp_submitted
        ? getMyStudyAssignmentItem?.student_progress.timestamp_submitted + " WIB"
        : "",
    },
    {
      namaTabel: "Pengiriman Tugas",
      response:
        getMyStudyAssignmentItem?.student_progress.assignment_answer === null
          ? []
          : getMyStudyAssignmentItem?.student_progress.assignment_answer.map((link) => [
              link.document_url,
              link.document_filename,
            ]),
    },
  ];

  const lateState = () => {
    if (tabelState[3].response === "Telah melewati batas waktu") {
      return "bg-warning-550";
    }
    return "bg-transparent";
  };
  return (
    <div className="bg-neutral-50">
      <section className="max-w-[1440px] mx-auto lg:pt-12 lg:pb-20 md:py-10 py-5 lg:px-32 md:px-14 px-7">
        <div className="bg-white w-full py-5 md:py-10 lg:py-12 px-6 md:px-12">
          <p className="text-[20px] font-semibold mb-[8px]">
            {getMyStudyAssignmentItem?.assignment?.title}
          </p>
          <p className="text-[16px] font-medium mb-[8px]">
            Tugas [Pertemuan ke-
            {getMyStudyAssignmentItem?.assignment?.session_assignment?.session_no}]
          </p>
          <p className="text-[16px] font-medium mb-[8px]">
            {
              getMyStudyAssignmentItem?.assignment.session_assignment?.subject_session
                ?.teacher_subject?.full_name
            }
          </p>
          <p className="text-[14px] mb-[35px] font-normal">
            {getMyStudyAssignmentItem?.assignment?.timestamp_created} WIB
          </p>
          <p className="text-[16px] font-normal">
            Silahkan baca dan kerjakan tugas pada modul berikut ini.
          </p>
          <div className="flex-col gap-y-2">
            {getMyStudyAssignmentItem?.assignment?.assignment_documents?.map((document, i) => (
              <div key={i} className="w-full flex items-center gap-x-1">
                <img
                  src="/icons/pdf.svg"
                  alt="File tugas"
                  className="inline-block mr-[8px] scale-[0.8] lg:scale-[1]"
                />
                <Link
                  to={document.document_url}
                  target="_blank"
                  className="w-fit overflow-hidden whitespace-nowrap text-ellipsis hover:underline hover:text-primary-500"
                >
                  {document.document_filename}
                </Link>
              </div>
            ))}
          </div>

          <div className="mt-[36px]">
            <p className="text-[20px] font-semibold mb-[25px]">Status Penugasan</p>
            <div className="grid lg:grid-cols-4 md:grid-cols-4 grid-cols-5 lg:text-[12px] text-[10px]">
              {tabelState.map((row, index) => {
                return (
                  <Fragment key={index}>
                    <div className="lg:col-span-1 md:col-span-1 col-span-2 bg-neutral-100 py-[20px] px-[20px] border-solid border-b-[1px] border-neutral-300 font-semibold">
                      {row.namaTabel}
                    </div>
                    <div
                      className={`flex items-center col-span-3 py-[20px] px-[20px] border-solid border-b-[1px] border-neutral-300 font-medium ${
                        row.namaTabel === "Pengiriman Tugas" && "text-primary-500 flex-col gap-y-2"
                      }
                  ${
                    row.response === "Belum Mengumpulkan"
                      ? lateState()
                      : row.response === "Terkirim" && "bg-success-200"
                  }
                  ${row.response === "Telah melewati batas waktu" && "text-warning-500 font-bold"}`}
                    >
                      {row.namaTabel === "Pengiriman Tugas" ? (
                        row.response instanceof Array && row.response.length > 0 ? (
                          <Fragment>
                            {row.response instanceof Array &&
                              row.response.map((link, index) => (
                                <Link
                                  to={link[0]}
                                  target="_blank"
                                  key={index}
                                  className="block w-full overflow-hidden whitespace-nowrap text-ellipsis hover:underline"
                                >
                                  {link[1]}
                                </Link>
                              ))}
                          </Fragment>
                        ) : (
                          ""
                        )
                      ) : (
                        row.response
                      )}
                    </div>
                  </Fragment>
                );
              })}
            </div>
          </div>
          <form>
            <UploadDragbleField
              name="files"
              className="border-dashed border-2 border-neutral-300 mt-[28px]"
              variant={"sm"}
            />
            <p className="text-neutral-base text-[14px] font-medium my-[24px]">
              <span className="font-semibold">Note</span> : Pastikan berkas sudah sesuai dengan
              ketentuan
            </p>
            <Button
              type={"submit"}
              className={`mx-auto py-6 lg:py-0 w-full h-[27px] md:w-[160px] md:h-[48px] text-[16px] font-medium  text-white disabled:bg-neutral-300 disabled:text-neutral-300 flex gap-x-2 rounded justify-center items-center hover:opacity-50 transition-opacity duration-300 ${"bg-primary-500 cursor-pointer"}`}
            >
              {"Unggah Tugas"}
            </Button>
          </form>
        </div>
      </section>
    </div>
  );
};
