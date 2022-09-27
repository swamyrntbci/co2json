import { Injectable, EventEmitter, Output } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from "rxjs"
import { HttpClient, HttpHeaders, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../environments/environment';
import { catchError, map, retry } from 'rxjs/operators';


@Injectable({
	providedIn: 'root'
})
export class ApiService {

	@Output() listSelectedUser = new EventEmitter<any>();

	public loadName = new BehaviorSubject<any>(false)
	userName = this.loadName.asObservable();

	public invalidToken = new BehaviorSubject<any>(false)
	invalidTokenData = this.invalidToken.asObservable();

	private isAuthenticated = new BehaviorSubject(false)
	public authenticatedUser = this.isAuthenticated.asObservable();


	loader = new BehaviorSubject(false)
	selectedPreviewScript = new BehaviorSubject('')
	alert = new BehaviorSubject([])
	baseAPIUrl 		= environment.serverApi


	httpOptions = {}
	externalhttpOptions = {}
	public dataStore: any = [];
	public _list = new BehaviorSubject<any[]>([]);
	readonly datas = this._list.asObservable();
	appConfigInfo = new BehaviorSubject([])
	allVal = { label: "All", value: "all" }


	constructor(
		private http: HttpClient,
	) {
		//let localstoreToken = localStorage.getItem('token');
		// Http Options
		this.httpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'application/json',
				//'x-api-key': 'd41d8cd98f00b204e9800998ecf8427e'
				//'Authorization': 'Bearer '+localstoreToken
			})
		}

		this.externalhttpOptions = {
			headers: new HttpHeaders({
				'Content-Type': 'text/plain'
			})
		}
	}
	

	//Get data by argument
	get(apiPath: string, arg: any): Observable<any> {

		return this.http.get<any>(this.baseAPIUrl + apiPath +'/'+ arg, this.httpOptions)
			.pipe(
				map(response => {					
					return response;
				}),
				catchError(this.handleError)
			)
	}

	getExternalUrl(apiPath: string): Observable<any> {

		return this.http.get<any>(apiPath,this.externalhttpOptions)
			.pipe(
				map(response => {					
					return response;
				}),
				catchError(this.handleError)
			)
	}

	paramlists(apiPath: string, params?: any, isStore?: boolean, listKey?: string) {
		
        return this.http.get<any>(this.baseAPIUrl + apiPath,  {params:params} )
			.pipe(
				map(response => { 
					if( isStore ) {
						if( !listKey ) {
							listKey = 'list';
							this.dataStore['list'] = [];
						} else {
							this.dataStore[listKey] = [];
						}
						this.dataStore[listKey] = response;
						this._list.next(Object.assign({}, this.dataStore)[listKey]);
					}
					return response;
				}),
				catchError(this.handleError),
				//retry(2)
			)
    }

	lists(apiPath: string, isStore?: boolean, listKey?: string): Observable<any> {
		
		return this.http.get<any>(this.baseAPIUrl + apiPath, this.httpOptions)
			.pipe(
				map(response => { 
					if( isStore ) {
						if( !listKey ) {
							listKey = 'list';
							this.dataStore['list'] = [];
						} else {
							this.dataStore[listKey] = [];
						}
						this.dataStore[listKey] = response;
						this._list.next(Object.assign({}, this.dataStore)[listKey]);
					}
					return response;
				}),
				catchError(this.handleError),
				//retry(2)
			)
	}

	create(apiPath: string, formData: any) {
		
		return this.http.post<any>(this.baseAPIUrl + apiPath, formData, this.httpOptions)
			.pipe(
				map(response => response),
				catchError(this.handleError),
			);
	}

	update(apiPath: string, formData: any) {
		return this.http.put<any>(this.baseAPIUrl + apiPath, formData, this.httpOptions)
		  .pipe(
			map(response => response),
			catchError(this.handleError)
		  );
    }

	updatepatch(apiPath: string, formData: any) {
		return this.http.patch<any>(this.baseAPIUrl + apiPath, formData, this.httpOptions)
		  .pipe(
			map(response => response),
			catchError(this.handleError)
		  );
    }

    // HttpClient API delete() method => Delete
	remove(apiPath: string ){
		return this.http.delete<any>(this.baseAPIUrl + apiPath, this.httpOptions)
		.pipe(
		map(response => response),
		catchError(this.handleError)
		)
	}

	// Set value if user exits
	isAuth(val: boolean) {
		this.isAuthenticated.next(val)
	}

	// Load the user name when loged in
	userNameload(val:any){
		this.loadName.next(val)
	}

	listUserSelected(data: any) {
		return this.listSelectedUser.emit(data)
	  }

	  invalidTokenResolve(invalidflag: boolean){ console.log('---invalidflag---', invalidflag)
		  return this.invalidToken.next(invalidflag)
	  }

	  
	private handleError(error: HttpErrorResponse) {
		const message = 'Something bad happened; please try again later.';
		return throwError(message);
	}

}
